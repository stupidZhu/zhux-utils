/**
 * title: v2 版本
 * desc: 可拖拽，可变大小弹窗。
 */

import React, { useState } from "react"
import { MyDialogV2 } from "./Mydialog"

const DialogV2 = () => {
  const [show, setShow] = useState(false)

  return (
    <div className="dialog-demo">
      <div className="btn-wrapper">
        <button className="common-btn" onClick={() => setShow(true)}>
          showDialogV2
        </button>
        <button onClick={() => setShow(false)}>hideDialogV2</button>
      </div>
      {show && (
        <MyDialogV2 position={{ left: 500, top: 300 }} close={() => setShow(false)}>
          这是一个可拖拽，可变大小弹窗。需要用户自行编写相关dom组件（此处的 MyDialogA ，MyDialogB 组件需自行编写）；useDialog
          hook 只提供可拖拽和 resize 支持，其他的诸如样式，动画，蒙版，鼠标样式等需自行实现。
        </MyDialogV2>
      )}
    </div>
  )
}

export default DialogV2
