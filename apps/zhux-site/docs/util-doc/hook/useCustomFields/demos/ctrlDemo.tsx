/**
 * title: 受控组件用法
 */

import React, { useState } from "react"
import { IKey } from "zhux-utils/dist/type"
import BaseDemo, { FieldItem } from "./base"
import "./index.scss"

const initData: Array<FieldItem & { _key: IKey }> = [
  { name: "张三", age: 17, gender: 1, _key: 1 },
  { name: "李四", gender: 2, _key: 2 },
  { name: "", age: 30, gender: 2, _key: 3 },
]

const CtrlDemo = () => {
  const [value, onChange] = useState(initData)

  return <BaseDemo value={value} onChange={onChange} />
}

export default CtrlDemo
