/**
 * title: 基础用法
 * desc: 可拖拽，可变大小弹窗。
 */
import React, { useState } from "react"
import { MyDialogA, MyDialogB } from "./Mydialog"

const BaseDemo = () => {
  const [show, setShow] = useState([false, false])

  return (
    <div className="dialog-demo">
      <div className="btn-wrapper">
        <button
          className="common-btn"
          onClick={() =>
            setShow(show => {
              show[0] = true
              return [...show]
            })
          }
        >
          showDialogA
        </button>
        <button
          onClick={() =>
            setShow(show => {
              show[1] = true
              return [...show]
            })
          }
        >
          showDialogB
        </button>
        <button onClick={() => setShow([true, true])}>showAll</button>
        <button onClick={() => setShow([false, false])}>hideAll</button>
      </div>
      {show[0] && (
        <MyDialogA
          position={{ left: 500, top: 300 }}
          close={() => {
            setShow(show => {
              show[0] = false
              return [...show]
            })
          }}
        >
          这是一个可拖拽，可变大小弹窗。需要用户自行编写相关dom组件（此处的 MyDialogA ，MyDialogB 组件需自行编写）；useDialog
          hook 只提供可拖拽和 resize 支持，其他的诸如样式，动画，蒙版，鼠标样式等需自行实现。
        </MyDialogA>
      )}
      {show[1] && (
        <MyDialogB
          close={() => {
            setShow(show => {
              show[1] = false
              return [...show]
            })
          }}
        >
          这是一个仅可拖拽的弹窗，useDialog 入参有 dialogRef，moveFieldRef，resizeFieldRef。其中 dialogRef 必传，传入
          moveFieldRef 使弹窗可拖拽，传入 resizeFieldRef 使弹窗可 resize，传入 confine 控制弹窗是否限制在可视范围内。
        </MyDialogB>
      )}
    </div>
  )
}

export default BaseDemo
