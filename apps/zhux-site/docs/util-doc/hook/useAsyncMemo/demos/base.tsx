/**
 * title: 基础用法
 * desc: 类似 useMemo，不过它的函数参数需要返回一个 promise
 */

import { useBoolean } from "ahooks"
import React from "react"
import { useAsyncMemo } from "zhux-utils-react"

const getPromise = (bool: boolean): Promise<{ bool: boolean; num: number }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ bool, num: Math.random() })
    }, 3000)
  })
}

const BaseDemo = () => {
  const [bool, { toggle }] = useBoolean()

  const { value, status } = useAsyncMemo(() => getPromise(bool), [bool])

  return (
    <div>
      <button onClick={toggle}>refetch - {String(bool)}</button>
      <p>status - {status}</p>
      <p>bool - {String(value?.bool)}</p>
      <p>num - {value?.num}</p>
    </div>
  )
}

export default BaseDemo
