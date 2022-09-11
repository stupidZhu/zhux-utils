import { debounce } from "lodash"
import React, { Fragment, MutableRefObject, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import { randomStr } from "../../util"
import CreatePortalHelper, { CreatePortalHelperConfig } from "./CreatePortalHelper"

export type AddFunc = (
  com: React.ReactNode,
  option?: { key?: string; replace?: boolean }
) => Promise<{ key: string; flag: boolean }>
export interface WrapperRef {
  add: AddFunc
  remove: (key: string) => boolean | Promise<boolean>
  clear: () => boolean | Promise<boolean>
  keySetRef: MutableRefObject<Set<string>>
}

interface WrapperComProps {
  wrapperRef?: MutableRefObject<Record<string, any>> | ((ref: WrapperRef) => void)
  createPortalHelper: CreatePortalHelper
  detachWrapperRef(): void
  config: CreatePortalHelperConfig
}

type PortalItem = { com: React.ReactNode; key: string; visible: boolean }
type PortalMap = Map<string, PortalItem>

export const WrapperCom: React.FC<WrapperComProps> = ({ wrapperRef, createPortalHelper, config, detachWrapperRef }) => {
  const portalMapRef = useRef<PortalMap>(new Map())
  const keySetRef = useRef<Set<string>>(new Set())
  const [portalList, _setPortalList] = useState<PortalItem[]>([])

  const setPortalList = useCallback(
    debounce((map?: PortalMap) => {
      const renderList = Array.from((map ?? portalMapRef.current).values())
      if (config.reverse) renderList.reverse()
      _setPortalList(renderList)
    }, 10),
    []
  )

  const cloneElement = useCallback((portal: PortalItem) => {
    const isComponent = (
      com: React.ReactNode
    ): com is React.ReactElement<any, string | React.JSXElementConstructor<any>> => {
      if (!React.isValidElement(portal.com)) return false
      // @ts-ignore
      return typeof com.type !== "string"
    }

    return isComponent(portal.com)
      ? React.cloneElement(portal.com!, {
          _key: portal.key,
          _visible: portal.visible,
          _createPortalHelper: createPortalHelper,
        })
      : portal.com
  }, [])

  const _remove = useCallback((key: string) => {
    let flag = false
    flag = portalMapRef.current.delete(key)
    setPortalList()
    return flag
  }, [])

  const remove = useCallback(
    (key: string): boolean | Promise<boolean> => {
      const portal = portalMapRef.current.get(key)
      if (!portal) return false
      keySetRef.current.delete(key)
      if (config.removeDelay > 0) {
        return new Promise(resolve => {
          portal.visible = false
          portal.com = cloneElement(portal)
          setPortalList()
          setTimeout(() => resolve(_remove(key)), config.removeDelay)
        })
      } else return _remove(key)
    },
    [_remove, cloneElement, setPortalList]
  )

  const add = useCallback(
    (com: React.ReactNode, option: { key?: string; replace?: boolean } = {}) => {
      const { key = `${randomStr(5)}-${Date.now()}`, replace = false } = option
      const portalMap = portalMapRef.current
      const exist = portalMap.has(key)
      if (!replace) {
        if (exist) return { key, flag: false }
        if (keySetRef.current.size >= config.maxCount) return { key: "", flag: false }
      }
      keySetRef.current.add(key)
      portalMap.set(key, { com: cloneElement({ com, key, visible: exist }), key, visible: exist })
      setPortalList()
      setTimeout(() => {
        if (exist) return
        const portal = portalMap.get(key)
        if (portal) {
          portal.visible = true
          portal.com = cloneElement(portal)
        }
        setPortalList()
      }, 20)
      if (keySetRef.current.size > config.maxCount) {
        const key = Array.from(keySetRef.current.values())[0]
        remove(key)
      }
      return { key, flag: true }
    },
    [cloneElement, remove, setPortalList]
  )

  const _clear = useCallback(() => {
    portalMapRef.current = new Map()
    _setPortalList([])
    return true
  }, [])

  const clear = useCallback((): boolean | Promise<boolean> => {
    keySetRef.current = new Set()
    if (config.removeDelay > 0) {
      return new Promise(resolve => {
        Array.from(portalMapRef.current.values()).forEach(portal => {
          portal.visible = false
          portal.com = cloneElement(portal)
        })
        setPortalList()
        setTimeout(() => resolve(_clear()), config.removeDelay)
      })
    } else return _clear()
  }, [_clear, cloneElement, setPortalList])

  useImperativeHandle(wrapperRef, () => ({ add, remove, clear, keySetRef }))

  useEffect(() => detachWrapperRef, [])

  return (
    <>
      {portalList.map(item => {
        return <Fragment key={item.key}>{item.com}</Fragment>
      })}
    </>
  )
}

export const DefaultPortalRoot: React.FC = () => {
  useEffect(() => {
    console.error("如果 renderType 为 render，则不必要使用 PortalRoot")
  }, [])
  return null
}
