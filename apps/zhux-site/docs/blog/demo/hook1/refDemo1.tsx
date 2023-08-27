/**
 * title: 关于 dom 的 ref 属性
 * desc: dom 的 ref 并不一定非要用 useRef 来接收，也可以是一个带 current 属性的对象或者函数
 */
import React, { useCallback, useEffect, useMemo } from "react"

const RefDemo = () => {
  const dom: { current: HTMLDivElement | null } = useMemo(() => {
    return { current: null }
  }, [])

  const func = useCallback(dom => {
    console.log(dom)
    // do something
  }, [])

  useEffect(() => {
    console.log(dom)
    // do something
  }, [])

  return (
    <div ref={dom}>
      <div ref={func}>refDemo</div>
    </div>
  )
}

export default RefDemo
