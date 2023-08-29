import { CSSProperties } from "react"

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

interface UtilOptions<CB extends Function> {
  dialog: HTMLElement
  afterMousedown?: CB
  beforeMousemove?: CB
  afterMousemove?: CB
  beforeMouseup?: CB
  afterMouseup?: CB
}

type ResizeFuncUtilOptions = UtilOptions<(size: ISize, mousePosition: IPosition) => void> & {
  minWidth: number
  minHeight: number
}
export const resizeFunc = (e: any, options: ResizeFuncUtilOptions) => {
  const { dialog, minWidth, minHeight, afterMousedown, beforeMousemove, afterMousemove, beforeMouseup, afterMouseup } =
    options

  const { layerX = 0, layerY = 0, clientX, clientY } = e
  const { offsetWidth = 0, offsetHeight = 0 } = e?.target ?? {}
  const offsetX = offsetWidth - layerX || 5
  const offsetY = offsetHeight - layerY || 5

  let paramState: [ISize, IPosition] = [
    { width: clientX - dialog.offsetLeft + offsetX, height: clientY - dialog.offsetTop + offsetY },
    { left: clientX, top: clientY },
  ]

  afterMousedown?.(...paramState)

  document.onmouseup = () => {
    beforeMouseup?.(...paramState)
    document.onmousemove = null
    document.onmouseup = null
    afterMouseup?.(...paramState)
  }
  document.onmousemove = (e: MouseEvent) => {
    beforeMousemove?.(...paramState)
    let width = e.clientX - dialog.offsetLeft + offsetX
    let height = e.clientY - dialog.offsetTop + offsetY

    if (width < minWidth) width = minWidth
    if (height < minHeight) height = minHeight
    if (width > window.innerWidth) width = window.innerWidth
    if (height > window.innerHeight) height = window.innerHeight

    dialog.style.width = width + "px"
    dialog.style.height = height + "px"

    paramState = [
      { width, height },
      { left: e.clientX, top: e.clientY },
    ]
    afterMousemove?.(...paramState)
  }
}

type MoveFuncUtilOptions = UtilOptions<(position: IPosition, mousePosition: IPosition) => void> & { confine: boolean }
export const moveFunc = (e: HTMLElementEventMap["mousedown"], options: MoveFuncUtilOptions) => {
  const { dialog, confine, afterMousedown, beforeMousemove, afterMousemove, beforeMouseup, afterMouseup } = options

  const { clientX, clientY } = e as MouseEvent

  // 代表鼠标坐标到 dialog 左上角的 offset
  const offset = { x: 0, y: 0 }
  offset.x = clientX - dialog.offsetLeft
  offset.y = clientY - dialog.offsetTop

  let paramState: [IPosition, IPosition] = [
    { left: clientX - offset.x, top: clientY - offset.y },
    { left: clientX, top: clientY },
  ]

  afterMousedown?.(...paramState)

  document.onmouseup = () => {
    beforeMouseup?.(...paramState)
    document.onmousemove = null
    document.onmouseup = null
    afterMouseup?.(...paramState)
  }

  document.onmousemove = (e: MouseEvent) => {
    beforeMousemove?.(...paramState)
    let x: number = e.clientX - offset.x
    let y: number = e.clientY - offset.y

    if (confine) {
      // 不允许超出屏幕
      if (x > window.innerWidth - dialog.offsetWidth) x = window.innerWidth - dialog.offsetWidth
      if (y > window.innerHeight - dialog.offsetHeight) y = window.innerHeight - dialog.offsetHeight
      if (x < 0) x = 0
      if (y < 0) y = 0
    }

    dialog.style.left = x + "px"
    dialog.style.top = y + "px"

    paramState = [
      { left: x, top: y },
      { left: e.clientX, top: e.clientY },
    ]
    afterMousemove?.(...paramState)
  }
}

export const resetStyle = (dom: HTMLElement) => {
  const style: CSSProperties = { position: "fixed", right: "unset", bottom: "unset" }
  Object.entries(style).forEach(([k, v]) => (dom.style[k] = v))
}
