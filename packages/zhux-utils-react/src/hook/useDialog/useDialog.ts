import { CSSProperties, useCallback, useEffect, useRef } from "react"
import { useConfigContext } from "../../component/ConfigProvider/ConfigProvider"
import { IRef } from "../../type"
import { getCurrent } from "../../util"
import { useWatchRefEffect } from "../effects/useWatchEffect/useWatchEffect"

export type IPosition = { top: number; left: number }
export type ISize = { width: number; height: number }

export type DialogMoveCb = (props: {
  type: "moving" | "moveStart" | "moveEnd"
  position: IPosition
  mousePosition: IPosition
}) => void
export type DialogResizeCb = (props: {
  type: "resizing" | "resizeStart" | "resizeEnd"
  size: ISize
  mousePosition: IPosition
}) => void

export interface UseDialogProps {
  dialogRef: IRef<HTMLElement>
  moveFieldRef?: IRef<HTMLElement>
  resizeFieldRef?: IRef<HTMLElement>
  minSize?: ISize
  confine?: boolean
  moveCb?: DialogMoveCb
  resizeCb?: DialogResizeCb
}

const resetStyle = (dom: HTMLElement) => {
  const style: CSSProperties = { position: "fixed", right: "unset", bottom: "unset" }
  Object.entries(style).forEach(([k, v]) => (dom.style[k] = v))
}

const useDialog = (props: UseDialogProps) => {
  const {
    moveFieldRef,
    dialogRef,
    resizeFieldRef,
    minSize = { width: 200, height: 150 },
    confine = true,
    moveCb,
    resizeCb,
  } = props
  const { width: minWidth, height: minHeight } = minSize
  const { dialogField } = useConfigContext() ?? {}
  const { getMaxZIndex, addKey, delKey } = dialogField ?? {}

  // 代表鼠标坐标到 dialog 左上角的 offset
  const { current: offset } = useRef({ x: 0, y: 0 })
  const { current: resetStyleFlag } = useRef({ move: false, resize: false })
  const uniqueKey = useRef(Date.now() + Math.random())

  const stateRef = useRef<{ isMoving: boolean; isResizing: boolean }>({ isMoving: false, isResizing: false })

  const moveFunc = useCallback(
    (e: Event) => {
      const box = getCurrent(dialogRef)
      if (!box) return
      box.style.zIndex = getMaxZIndex?.() ?? "1000"
      const { clientX, clientY } = e as MouseEvent

      offset.x = clientX - box.offsetLeft
      offset.y = clientY - box.offsetTop

      let paramState: [IPosition, IPosition] = [
        { left: clientX - offset.x, top: clientY - offset.y },
        { left: clientX, top: clientY },
      ]
      moveCb?.({ type: "moveStart", position: paramState[0], mousePosition: paramState[1] })

      document.onmouseup = () => {
        moveCb?.({ type: "moveEnd", position: paramState[0], mousePosition: paramState[1] })
        resetStyleFlag.move = false
        document.onmousemove = null
        document.onmouseup = null
        setTimeout(() => (stateRef.current.isMoving = false))
      }

      document.onmousemove = (e: MouseEvent) => {
        stateRef.current.isMoving = true
        let x: number = e.clientX - offset.x
        let y: number = e.clientY - offset.y

        if (confine) {
          // 不允许超出屏幕
          if (x > window.innerWidth - box.offsetWidth) x = window.innerWidth - box.offsetWidth
          if (y > window.innerHeight - box.offsetHeight) y = window.innerHeight - box.offsetHeight
          if (x < 0) x = 0
          if (y < 0) y = 0
        }

        box.style.left = x + "px"
        box.style.top = y + "px"

        if (!resetStyleFlag.move) {
          resetStyleFlag.move = true
          resetStyle(box)
        }

        paramState = [
          { left: x, top: y },
          { left: e.clientX, top: e.clientY },
        ]
        moveCb?.({ type: "moving", position: paramState[0], mousePosition: paramState[1] })
      }
    },
    [dialogRef, offset, moveCb]
  )

  const resizeFunc = useCallback(
    (e: any) => {
      const { layerX = 0, layerY = 0, clientX, clientY } = e
      const { offsetWidth = 0, offsetHeight = 0 } = e?.target ?? {}
      const offsetX = offsetWidth - layerX || 5
      const offsetY = offsetHeight - layerY || 5

      const box = getCurrent(dialogRef)
      if (!box) return
      box.style.zIndex = getMaxZIndex?.() ?? "1000"

      let paramState: [ISize, IPosition] = [
        { width: clientX - box.offsetLeft + offsetX, height: clientY - box.offsetTop + offsetY },
        { left: clientX, top: clientY },
      ]
      resizeCb?.({ type: "resizeStart", size: paramState[0], mousePosition: paramState[1] })

      document.onmouseup = () => {
        resizeCb?.({ type: "resizeEnd", size: paramState[0], mousePosition: paramState[1] })
        document.onmousemove = null
        document.onmouseup = null
        setTimeout(() => (stateRef.current.isResizing = false))
      }
      document.onmousemove = (e: MouseEvent) => {
        stateRef.current.isResizing = true
        let width = e.clientX - box.offsetLeft + offsetX
        let height = e.clientY - box.offsetTop + offsetY

        if (width < minWidth) width = minWidth
        if (height < minHeight) height = minHeight
        if (width > window.innerWidth) width = window.innerWidth
        if (height > window.innerHeight) height = window.innerHeight

        box.style.width = width + "px"
        box.style.height = height + "px"

        paramState = [
          { width, height },
          { left: e.clientX, top: e.clientY },
        ]
        resizeCb?.({ type: "resizing", size: paramState[0], mousePosition: paramState[1] })
      }
    },
    [dialogRef, minHeight, minWidth, resizeCb]
  )

  useWatchRefEffect((el, prevEl) => {
    el?.addEventListener("mousedown", moveFunc)
    prevEl?.removeEventListener("mousedown", moveFunc)
  }, moveFieldRef)

  useWatchRefEffect((el, prevEl) => {
    el?.addEventListener("mousedown", resizeFunc)
    prevEl?.removeEventListener("mousedown", resizeFunc)
  }, resizeFieldRef)

  useEffect(() => {
    const dialog = getCurrent(dialogRef)
    if (dialog) dialog.style.zIndex = getMaxZIndex?.() ?? "1000"
  })

  useEffect(() => {
    const key = uniqueKey.current
    addKey?.(key)
    return () => delKey?.(key)
  }, [])

  return stateRef.current
}

export default useDialog
