/**
 * title : 只触发一次的 effect
 * desc : 点开控制台查看
 */
import { useBoolean } from "ahooks"
import React, { useRef, useState } from "react"
import { useOnceEffect } from "zhux-utils-react"
const BaseDemo = () => {
  const [bool, { toggle }] = useBoolean(false)
  const boolRef = useRef(false)
  const [value, setValue] = useState("")

  useOnceEffect(() => {
    console.log("一进来就触发了 useOnceEffect")
    return () => {
      console.log("clear1")
    }
  })

  useOnceEffect(
    () => {
      console.log("bool 为 true 时触发 useOnceEffect", value)
      return () => {
        console.log("clear2")
      }
    },
    undefined,
    () => bool
  )

  useOnceEffect(
    () => {
      console.log("bool 为 true, 且 value 第一次改变时触发 useOnceEffect", value)
      return () => {
        console.log("clear3")
      }
    },
    [value],
    () => bool
  )

  useOnceEffect(
    () => {
      console.log("boolRef 为 true 时触发 useOnceEffect", value)
      return () => {
        console.log("clear3")
      }
    },
    undefined,
    boolRef
  )

  useOnceEffect(
    () => {
      console.log("boolRef 为 true, 且 value 第一次改变时触发 useOnceEffect", value)
      return () => {
        console.log("clear4")
      }
    },
    [value],
    boolRef
  )
  return (
    <>
      <input type="text" placeholder="写点什么" value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={toggle}>toggle-{String(bool)}</button>
    </>
  )
}

export default BaseDemo
