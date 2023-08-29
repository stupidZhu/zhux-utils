import { useMemoizedFn } from "ahooks"
import React, { useRef } from "react"
import { useDialog, useDialogV2 } from "zhux-utils-react"
import { DialogMoveCb, DialogResizeCb, IPosition } from "zhux-utils-react/dist/hook/useDialog/useDialog"
import { WithChildren } from "zhux-utils-react/dist/type"
import "./index.scss"

export const MyDialogA: React.FC<
  { close: () => void; position?: IPosition; moveCb?: DialogMoveCb; resizeCb?: DialogResizeCb } & WithChildren
> = ({ close, position = { left: 0, top: 0 }, moveCb, resizeCb, children }) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const moveFieldRef = useRef<HTMLDivElement>(null)
  const resizeFieldRef = useRef<HTMLDivElement>(null)

  const { state } = useDialog({ dialogRef, moveFieldRef, resizeFieldRef, moveCb, resizeCb })

  return (
    <div className="use-dialog dialog-a" ref={dialogRef} style={{ ...position }}>
      <div
        className="move-field"
        ref={moveFieldRef}
        onClick={() => {
          // 注意此处用法，不应该 把isMoving解构出来（const { isMoving } = ...），因为作用域在函数定义时就已经确定了。而不是在函数调用时确定
          if (state.isMoving) return
        }}
      >
        <button
          onClick={e => {
            e.stopPropagation()
            close()
          }}
        >
          x
        </button>
      </div>
      <div className="use-dialog-content">{children}</div>
      <span className="desc">鼠标移动到此处 resize -&gt;</span>
      <div className="resize-field" ref={resizeFieldRef}></div>
    </div>
  )
}

export const MyDialogB: React.FC<{ close: () => void; position?: IPosition } & WithChildren> = ({
  close,
  position = { left: 0, top: 0 },
  children,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const moveFieldRef = useRef<HTMLDivElement>(null)
  // const resizeFieldRef = useRef<HTMLDivElement>(null);

  useDialog({ dialogRef, moveFieldRef, confine: false })

  return (
    <div className="use-dialog dialog-b" ref={dialogRef} style={{ ...position }}>
      <div className="move-field" ref={moveFieldRef}>
        <button onClick={close}>x</button>
      </div>
      <div className="use-dialog-content">{children}</div>
      {/* <div className="resize-field" ref={resizeFieldRef}></div> */}
    </div>
  )
}

export const MyDialogV2: React.FC<
  { close: () => void; position?: IPosition; moveCb?: DialogMoveCb; resizeCb?: DialogResizeCb } & WithChildren
> = ({ close, position = { left: 0, top: 0 }, moveCb: _moveCb, resizeCb: _resizeCb, children }) => {
  const changingRef = useRef(false)

  const moveCb: DialogMoveCb = useMemoizedFn(props => {
    if (props.type === "moving") changingRef.current = true
    else if (props.type === "moveEnd") setTimeout(() => (changingRef.current = false))
    _moveCb?.(props)
  })

  const resizeCb: DialogResizeCb = useMemoizedFn(props => {
    if (props.type === "resizing") changingRef.current = true
    else if (props.type === "resizeEnd") setTimeout(() => (changingRef.current = false))
    _resizeCb?.(props)
  })

  const { setRef } = useDialogV2({ moveCb, resizeCb })

  return (
    <div className="use-dialog dialog-a" ref={node => setRef(node, "dialog")} style={{ ...position }}>
      <div
        className="move-field"
        ref={node => setRef(node, "moveHandler")}
        onClick={() => {
          if (!changingRef.current) console.log("hello")
        }}
      >
        <button
          onClick={e => {
            e.stopPropagation()
            close()
          }}
        >
          x
        </button>
      </div>
      <div className="use-dialog-content">{children}</div>
      <span className="desc">鼠标移动到此处 resize -&gt;</span>
      <div
        className="resize-field"
        ref={node => setRef(node, "resizeHandler")}
        onClick={() => {
          if (!changingRef.current) console.log("world")
        }}
      ></div>
    </div>
  )
}
