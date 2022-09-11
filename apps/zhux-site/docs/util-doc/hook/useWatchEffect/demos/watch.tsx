/**
 * title : useWatchEffect
 * desc : 这个 hook 会在依赖发生改变的时候触发传入的回调，回调的第一个参数是依赖的新值，第二个参数的改变前的值
 */
import { useBoolean } from "ahooks"
import React from "react"
import { useWatchEffect } from "zhux-utils-react"

let boolean = false

const BaseDemo = () => {
  const [bool, { toggle }] = useBoolean(false)

  useWatchEffect((val, prevVal) => {
    console.log(val, prevVal, "bool")
    return () => {
      console.log(val, prevVal, "clear")
    }
  }, bool)

  // 以下为错误示范
  useWatchEffect((val, prevVal) => {
    console.log(val, prevVal, "boolean")
  }, boolean)

  return (
    <div className="btn-wrapper">
      <button onClick={toggle}>toggleState</button>
      <button
        onClick={() => {
          boolean = !boolean
        }}
      >
        toggleBoolean
      </button>
    </div>
  )
}

export default BaseDemo
