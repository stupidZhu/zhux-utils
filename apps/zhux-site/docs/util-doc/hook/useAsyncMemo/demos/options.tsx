/**
 * title: 第三个参数的使用示例
 */

import { useBoolean } from "ahooks"
import React from "react"
import { useAsyncMemo } from "zhux-utils-react"

const getPromise = (bool: boolean): Promise<{ bool: boolean; num: number }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const num = Math.random()
      console.log(`getPromise num is: ${num}`)
      num > 0.5 ? resolve({ bool, num }) : reject("error")
    }, 3000)
  })
}

const OptionsDemo = () => {
  const [bool, { toggle }] = useBoolean()

  const { value, status } = useAsyncMemo(() => getPromise(bool), [bool], {
    reFetchDelay: 1000,
    reFetchTimes: 3,
    defaultValue: { num: 666, bool: true },
  })

  return (
    <div>
      <button onClick={toggle}>refetch - {String(bool)}</button>
      <p>status - {status}</p>
      <p>bool - {String(value?.bool)}</p>
      <p>num - {value?.num}</p>
    </div>
  )
}

export default OptionsDemo
