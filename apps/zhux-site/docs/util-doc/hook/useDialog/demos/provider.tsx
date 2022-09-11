/**
 * title: 多弹窗的 z-index
 * desc: 使用 ConfigProvider 让当前操作弹窗显示最前。
 */
import React, { useState } from "react"
import { ConfigProvider } from "zhux-utils-react"
import { MyDialogA } from "./Mydialog"

const ProviderDemo = () => {
  const [show, setShow] = useState([false, false, false])

  return (
    <ConfigProvider>
      <div className="btn-wrapper">
        <button
          onClick={() => {
            setShow([true, true, true])
          }}
        >
          showAll
        </button>
        <button
          onClick={() => {
            setShow([false, false, false])
          }}
        >
          hideAll
        </button>
      </div>
      {show[0] && (
        <MyDialogA
          close={() => {
            setShow(show => {
              show[0] = false
              return [...show]
            })
          }}
        >
          尝试移动每个弹窗，看看是否当前操作的弹窗显示在最前。useDialog会返回一个对象，对象的属性标志着 dialog 的 move 或
          resize 状态。比如给 moveField 添加了点击事件，但如果发生了move，点击事件该如何处理，由用户自行决定。注意不应该把
          isMoving 解构出来，因为作用域在函数定义时就已经确定了，而不是在函数调用时确定。详见 MyDialogA
        </MyDialogA>
      )}
      {show[1] && (
        <MyDialogA
          close={() => {
            setShow(show => {
              show[1] = false
              return [...show]
            })
          }}
        >
          ConfigProvider 可以在项目的 index.tsx/main.tsx 中使用，类似 antd 的 ConfigProvider 。ConfigProvider 可传入
          initMaxZIndex 设置默认 zIndex （默认值 1000）。
        </MyDialogA>
      )}
      {show[2] && (
        <MyDialogA
          close={() => {
            setShow(show => {
              show[2] = false
              return [...show]
            })
          }}
          moveCb={console.log}
          resizeCb={console.log}
        >
          当 useDialog 传入 onMove/onResize 回调函数时，在弹窗 Move/Resize 时会触发相关回调函数。尝试 Move/Resize
          此弹窗，查看控制台。
        </MyDialogA>
      )}
    </ConfigProvider>
  )
}

export default ProviderDemo
