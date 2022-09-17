/**
 * title: AddCacheWrapper
 * desc: 根据函数参数，缓存你的函数执行结果
 */

import React from "react"
import { CommonUtil } from "zhux-utils"

const _testFunc = <T extends {}>(prop: T): T => {
  // 假装这里执行了一些很耗费性能的操作
  console.log(`[_testFunc] prop: ${prop}`)
  return prop
}

const testFunc = CommonUtil.addCacheWrapper(_testFunc)

const AddCacheWrapper = () => {
  return (
    <div>
      <span>多次点击，_testFunc 只有第一次执行，后续的结果都是读取的缓存</span>&emsp;
      <button
        onClick={() => {
          console.log(testFunc("hello world"))
        }}
      >
        打印 hello world
      </button>
      <hr />
      <span>参数不一致，不使用缓存的结果，_testFunc 每次都会执行</span>&emsp;
      <button
        onClick={() => {
          console.log(testFunc(Date.now()))
        }}
      >
        打印时间戳
      </button>
    </div>
  )
}

export default AddCacheWrapper
