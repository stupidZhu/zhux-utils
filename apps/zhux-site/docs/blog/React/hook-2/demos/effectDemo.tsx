/**
 * title: 不一定只能在最顶层使用 Hook
 * desc: 这里 useEffect 也可以正常执行，记得要关闭 eslint 检查。
 */
/* eslint-disable */
import React, { useEffect, useState } from "react"

const Demo1 = () => {
  const [name, setName] = useState("hello")

  if (name) {
    useEffect(() => {
      console.log("effect 1")
    })
  } else {
    useEffect(() => {
      console.log("effect 2")
    })
  }

  return (
    <>
      <span>{name}</span>
      <button onClick={() => setName(name => (name ? "" : "hello"))}>setName</button>
    </>
  )
}

export default Demo1
