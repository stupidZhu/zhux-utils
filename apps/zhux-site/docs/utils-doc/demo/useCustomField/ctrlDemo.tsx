/**
 * title: 受控组件用法
 */

import React, { useState } from "react"
import BaseDemo, { FieldItem } from "./base"
import "./index.scss"

const initData: FieldItem[] = [
  { id: 1, name: "张三", age: 17, gender: false },
  { id: 2, name: "李四", gender: true },
  { id: 3, name: "", age: 30, gender: true },
]

const CtrlDemo = () => {
  const [value, onChange] = useState(initData)

  return <BaseDemo value={value} onChange={onChange} />
}

export default CtrlDemo
