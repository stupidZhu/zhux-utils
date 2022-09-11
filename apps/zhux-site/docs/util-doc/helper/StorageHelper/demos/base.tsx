/**
 * title: 用法
 * desc: 带过期时间，自定义前缀，可保存任意类型的 StorageHelper
 */
import React, { useRef } from "react"
import { StorageHelper } from "zhux-utils"

const BaseDemo = () => {
  const { current: storageHelper } = useRef(new StorageHelper("ZX"))
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <button onClick={() => storageHelper.setItem("ITEM1", { hello: "item1" })}>添加一项</button>
      <button onClick={() => console.log(storageHelper.getItem("ITEM1"))}>打印 ITEM1</button>
      <button onClick={() => storageHelper.setItem("ITEM2", { hello: "item2" }, { seconds: 10 })}>
        并设置过期时间（10s）
      </button>
      <button onClick={() => console.log(storageHelper.getItem("ITEM2"))}>打印 ITEM2（10s后再试试）</button>
      <button
        onClick={() => {
          const res = storageHelper.getItem<{ hello: string }>("ITEM1")
          console.log("hello " + res?.hello)
        }}
      >
        泛型
      </button>
      <button onClick={() => console.log(storageHelper.getItem("NO_EXIST", [1, 2, 3]))}>默认值</button>
      <button
        onClick={() => {
          localStorage.setItem("ZX_ITEM3", JSON.stringify({ hello: "item3" }))
          // 会尝试 JSON.parse
          console.log(storageHelper.getItem("ITEM3"), localStorage.getItem("ZX_ITEM3"))
        }}
      >
        不符合规范的值
      </button>
      <button
        onClick={() => {
          localStorage.setItem("ZX_ITEM4", JSON.stringify({ _expire: [1, 2], hello: [3, 4] }))
          // 使用 storageHelper 存储的格式为 { data:any , _expire:number }
          console.log(storageHelper.getItem("ITEM4"), localStorage.getItem("ZX_ITEM4"))
        }}
      >
        不符合规范的值2
      </button>
      <button onClick={() => storageHelper.removeItems(["ITEM1", "ITEM2", "ITEM3", "ITEM4"])}>移除</button>
    </div>
  )
}

export default BaseDemo
