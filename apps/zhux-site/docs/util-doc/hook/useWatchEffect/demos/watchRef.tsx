/**
 * title : useWatchRefEffect
 * desc : 与 useWatchEffect 的区别是它的依赖值的类型为 `IRef`
 */
import { useBoolean } from "ahooks"
import React from "react"
import { useWatchRefEffect } from "zhux-utils-react"

let boolean = false

const BaseDemo = () => {
  const [bool, { toggle }] = useBoolean(false)

  useWatchRefEffect(
    (val, prevVal) => {
      console.log(val, prevVal, "bool")
      return () => {
        console.log(val, prevVal, "clear")
      }
    },
    () => bool
  )

  // 以下为错误示范
  useWatchRefEffect(
    (val, prevVal) => {
      console.log(val, prevVal, "boolean")
    },
    () => boolean
  )

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
