/**
 * title: 关于 useCallback
 * desc: 这个 demo，如果你的 func 没有使用 useCallback 包装，会导致组件无限重渲染，你可以把代码复制过去自己试试看。
 */
import { useUpdate } from "ahooks"
import React, { useCallback, useEffect } from "react"

const useCustomHook = () => {
  const reRender = useUpdate()

  // 错误示范，会导致组件无限重渲染
  // const func = () => {
  //   console.log("reRender")
  //   reRender()
  // }

  const func = useCallback(() => {
    console.log("reRender")
    reRender()
  }, [])

  return func
}

const MemoDemo = () => {
  const func = useCustomHook()

  useEffect(() => {
    func()
  }, [func])

  return <div>useCallbackDemo</div>
}

export default MemoDemo
