import classNames from "classnames"
import { useRef } from "react"
import ReactDOM from "react-dom"
import { CSSTransition } from "react-transition-group"
import { CommonUtil } from "zhux-utils"
import { CreatePortalHelper, useCtrlComponent, useDialog } from "zhux-utils-react"
import { UseDialogProps } from "zhux-utils-react/dist/hook/useDialog/useDialog"
import { ClassStyle, CommonComProps, WithChildren } from "zhux-utils-react/dist/type"
import styles from "./index.module.scss"

interface MyDialogProps extends ClassStyle, WithChildren {
  _key?: string
  _visible?: boolean
  _createPortalHelper?: CreatePortalHelper
  title?: string
  size?: "middle" | "small" | "large" | "micro"
  showClose?: boolean
}

const MyDialog: React.FC<MyDialogProps> = props => {
  const {
    _key,
    _visible,
    _createPortalHelper,
    showClose = true,
    title = "dialog",
    size = "middle",
    className,
    style,
    children,
  } = props
  const moveFieldRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useDialog({ dialogRef, moveFieldRef })

  return (
    <CSSTransition nodeRef={dialogRef} in={_visible} timeout={300} classNames="dialog" mountOnEnter>
      <div className={classNames(styles.myDialog, styles[size], className)} style={style} ref={dialogRef}>
        <div className={styles.moveField} ref={moveFieldRef}></div>
        <div className={styles.dialogTitle}>
          <span>{title}</span>
          {showClose && <i className="iconfont pop-iconclose" onClick={() => _createPortalHelper?.remove(_key ?? "")}></i>}
        </div>
        <div className={styles.childrenWrapper}>{children}</div>
      </div>
    </CSSTransition>
  )
}

export default MyDialog

interface CustomDialogProps extends CommonComProps<boolean>, Partial<UseDialogProps>, WithChildren {
  title?: string
  size?: "middle" | "small" | "large" | "micro"
  showClose?: boolean
}

export const CustomDialog: React.FC<CustomDialogProps> = props => {
  const { title = "dialog", size = "middle", showClose = true, className, style, children, ...rest } = props
  const moveFieldRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const [visible, setVisible] = useCtrlComponent<boolean>(props, { defaultValue: true })
  useDialog({ dialogRef, moveFieldRef, ...rest })

  if (!visible) return null

  return ReactDOM.createPortal(
    <div className={classNames(styles.myDialog, styles[size], className)} style={style} ref={dialogRef}>
      <div className={styles.moveField} ref={moveFieldRef}></div>
      <div className={styles.dialogTitle}>
        <span>{title}</span>
        {showClose && <i className="iconfont pop-iconclose" onClick={() => setVisible(false)}></i>}
      </div>
      <div className={styles.childrenWrapper}>{children}</div>
    </div>,
    CommonUtil.getDom("ud-portal-wrapper")
  )
}
