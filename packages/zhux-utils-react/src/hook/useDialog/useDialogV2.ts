import { useMemoizedFn } from "ahooks"
import { useEffect, useRef } from "react"
import { useConfigContext } from "../../component/ConfigProvider/ConfigProvider"
import { getCurrent } from "../../util"
import { useWatchRefEffect } from "../effect/useWatchEffect"
import { DialogMoveCb, DialogResizeCb } from "./useDialog"
import { ISize, moveFunc, resetStyle, resizeFunc } from "./util"

export interface UseDialogProps {
  minSize?: ISize
  confine?: boolean
  moveCb?: DialogMoveCb
  resizeCb?: DialogResizeCb
}

const useDialog = (props: UseDialogProps) => {
  const { minSize = { width: 200, height: 150 }, confine = true, moveCb, resizeCb } = props
  const { width: minWidth, height: minHeight } = minSize
  const { dialogField } = useConfigContext() ?? {}
  const { getMaxZIndex, addKey, delKey } = dialogField ?? {}

  const moveHandlerRef = useRef<HTMLElement | null>()
  const resizeHandlerRef = useRef<HTMLElement | null>()
  const dialogRef = useRef<HTMLElement | null>(null)
  const setRef = useMemoizedFn((node: HTMLElement | null, type: "dialog" | "moveHandler" | "resizeHandler") => {
    if (type === "dialog") dialogRef.current = node
    else if (type === "moveHandler") moveHandlerRef.current = node
    else resizeHandlerRef.current = node

    const dialog = getCurrent(dialogRef)
    if (dialog) dialog.style.zIndex = getMaxZIndex?.() ?? "1000"
  })

  const uniqueKey = useRef(Date.now() + Math.random())

  const getDialogInfo = useMemoizedFn(() => getCurrent(dialogRef)?.getBoundingClientRect())
  const setDialogInfo = useMemoizedFn((props: { top?: string; left?: string; width?: string; height?: string }) => {
    const dialog = getCurrent(dialogRef)
    if (!dialog) return
    Object.entries(props).forEach(([k, v]) => (dialog.style[k] = v))
  })

  const onMove = useMemoizedFn((e: HTMLElementEventMap["mousedown"]) => {
    const dialog = getCurrent(dialogRef)
    if (!dialog) return
    dialog.style.zIndex = getMaxZIndex?.() ?? "1000"

    moveFunc(e, {
      dialog,
      confine,
      afterMousedown(position, mousePosition) {
        resetStyle(dialog)
        moveCb?.({ type: "moveStart", position, mousePosition })
      },
      afterMousemove(position, mousePosition) {
        moveCb?.({ type: "moving", position, mousePosition })
      },
      afterMouseup(position, mousePosition) {
        moveCb?.({ type: "moveEnd", position, mousePosition })
      },
    })
  })

  const onResize = useMemoizedFn((e: any) => {
    const dialog = getCurrent(dialogRef)
    if (!dialog) return
    dialog.style.zIndex = getMaxZIndex?.() ?? "1000"

    resizeFunc(e, {
      dialog,
      minWidth,
      minHeight,
      afterMousedown(size, mousePosition) {
        resizeCb?.({ type: "resizeStart", size, mousePosition })
      },
      afterMousemove(size, mousePosition) {
        resizeCb?.({ type: "resizing", size, mousePosition })
      },
      afterMouseup(size, mousePosition) {
        resizeCb?.({ type: "resizeEnd", size, mousePosition })
      },
    })
  })

  useWatchRefEffect(
    (el, prevEl) => {
      el?.addEventListener("mousedown", onMove)
      prevEl?.removeEventListener("mousedown", onMove)
    },
    moveHandlerRef,
    true
  )

  useWatchRefEffect(
    (el, prevEl) => {
      el?.addEventListener("mousedown", onResize)
      prevEl?.removeEventListener("mousedown", onResize)
    },
    resizeHandlerRef,
    true
  )

  useEffect(() => {
    const key = uniqueKey.current
    addKey?.(key)
    return () => delKey?.(key)
  }, [])

  return { setRef, getDialogInfo, setDialogInfo }
}

export default useDialog
