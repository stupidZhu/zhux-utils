/**
 * title: 关于 useMemo
 * desc: renderData 只在 rawData 和 double 改变时重新计算，在 renderData 中用到了 unimportantValue，但没把它写在依赖数组里面，所以它的改变不会使 renderData 重新计算。在 renderData 中没有用到 notUsedValue，但把它写在了依赖数组里面，所以它的改变会使 renderData 重新计算（每次重新计算会在控制台打印 `calc renderData`）。
 */

import { useBoolean } from "ahooks"
import { cloneDeep } from "lodash"
import React, { useMemo, useState } from "react"

const MemoDemo = () => {
  const [double, { toggle }] = useBoolean(false)
  const [rawData, setRawData] = useState([
    { label: "hello", value: 1 },
    { label: "world", value: 2 },
  ])
  const [unimportantValue, setUnimportantValue] = useState({ label: "unimportant", value: 0 })
  const [notUsedValue, { toggle: toggleNotUsedValue }] = useBoolean(false)

  const toggleRawData = () => {
    const data = {
      hello: [
        { label: "你好", value: 1 },
        { label: "世界", value: 2 },
      ],
      你好: [
        { label: "hello", value: 1 },
        { label: "world", value: 2 },
      ],
    }
    setRawData(raw => data[raw[0].label])
  }

  const renderData = useMemo(() => {
    console.log("calc renderData")
    const _temp = cloneDeep([...rawData, unimportantValue])
    return double ? _temp.map(item => ({ ...item, value: (item.value *= 2) })) : _temp
  }, [rawData, double, notUsedValue])

  return (
    <div>
      <button onClick={toggle}>toggleDouble</button>
      <button onClick={toggleRawData}>toggleRawData</button>
      <button onClick={() => setUnimportantValue(v => ({ ...v, value: v.value + 1 }))}>changeUnimportantValue</button>
      <button onClick={toggleNotUsedValue}>toggleNotUsedValue</button>
      <hr />
      {renderData.map(item => {
        return (
          <div key={item.label}>
            {item.label} --- {item.value}
          </div>
        )
      })}
    </div>
  )
}

export default MemoDemo
