/**
 * title : useEffect & useLayoutEffect
 * desc: useLayoutEffect浏览器渲染前执行，所以不会闪烁（不会出现0）。从它们在控制台的打印结果不同也可以看出来它们执行时机的不同。[参考](https://juejin.cn/post/6844904008402862094)。
 */
import React, { useEffect, useLayoutEffect, useState } from "react"

const EffectDemo = () => {
  const [count, setCount] = useState(0)
  const [count1, setCount1] = useState(0)

  useEffect(() => {
    if (count === 0) {
      setCount(10 + Math.random() * 200)
    }
  }, [count])

  useLayoutEffect(() => {
    if (count1 === 0) {
      setCount1(10 + Math.random() * 200)
    }
  }, [count1])

  useEffect(() => {
    console.log(document.querySelector("#hello"), "useEffect") // <div id="hello"></div>  'useEffect'
  }, [])

  useLayoutEffect(() => {
    console.log(document.querySelector("#hello"), "useLayoutEffect") // div#hello 'useLayoutEffect'
  }, [])

  return (
    <>
      <div>
        {count}
        <button onClick={() => setCount(0)}>effect</button>
      </div>
      <div>
        {count1}
        <button onClick={() => setCount1(0)}>layoutEffect</button>
      </div>
      <div id="hello"></div>
    </>
  )
}

export default EffectDemo
