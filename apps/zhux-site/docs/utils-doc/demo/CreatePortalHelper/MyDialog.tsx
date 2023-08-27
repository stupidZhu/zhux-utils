import classNames from "classnames"
import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import { CreatePortalHelper, useDialog } from "zhux-utils-react"
import { ClassStyle, WithChildren } from "zhux-utils-react/dist/type"
import "./index.scss"

interface MyDialogProps extends ClassStyle, WithChildren {
  _key?: string
  _visible?: boolean
  _createPortalHelper?: CreatePortalHelper
  title?: string
  removeDelay?: 300 | 1000
}

export const MyDialog: React.FC<MyDialogProps> = props => {
  const { _key, _visible, _createPortalHelper, title = "dialog", removeDelay = 300, className, style, children } = props
  const moveFieldRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  useDialog({ dialogRef, moveFieldRef })

  return (
    <CSSTransition
      nodeRef={dialogRef}
      in={_visible}
      timeout={removeDelay}
      classNames={removeDelay === 300 ? "dialog" : "dialog-1000"}
      mountOnEnter
    >
      <div className={classNames("my-dialog", className)} style={style} ref={dialogRef}>
        <div className="move-field" ref={moveFieldRef}></div>
        <div className="dialog-header">
          <span>{title}</span>
          <span onClick={() => _createPortalHelper?.remove(_key ?? "")}>X</span>
        </div>
        <div className="dialog-content">{children}</div>
      </div>
    </CSSTransition>
  )
}
