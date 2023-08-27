/**
 * title: 用法
 * desc: 第一个按钮会缓存结果；第二个按钮每次都会发起请求；第三个按钮 get 不传第二个参数，打印结果取决于值是否被缓存
 */

import React from "react"
import { CacheHelper } from "zhux-utils"

const fakeFetch = <T extends {} = any>(props: T): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("触发一次请求")
      resolve(props)
    }, 1000)
  })
}

const cacheHelper = new CacheHelper()
const key = { hello: "world", name: "zhux" }

const BaseDemo = () => {
  return (
    <div className="btn-wrapper">
      <button onClick={() => cacheHelper.get(["fetchData", key], () => fakeFetch(key)).then(console.log)}>
        fetchData & cache
      </button>
      <button onClick={() => fakeFetch(key).then(console.log)}>fetchData</button>
      <button
        onClick={() => {
          const key = { name: "zhux", hello: "world" }
          cacheHelper.get(["fetchData", key]).then(console.log)
        }}
      >
        fetchData & equal key
      </button>
      <button onClick={() => cacheHelper.remove(["fetchData", key])}>remove</button>
    </div>
  )
}

export default BaseDemo
