/**
 * title: 关于 effect 的执行顺序
 * desc: 搞懂这个貌似没有什么太大的用处。不过要知道 effect 执行的顺序取决于书写的顺序（effect1 总是比 effect2 先执行）。
 */
import { useBoolean } from "ahooks"
import React, { useEffect, useLayoutEffect } from "react"
import { WithChildren } from "zhux-utils-react/dist/type"

const Parent: React.FC<WithChildren> = ({ children }) => {
  useEffect(() => {
    console.log("parentEffect1 parentMount")
    return () => console.log("parentEffect1 parentUnmount")
  }, [])

  useEffect(() => {
    console.log("parentEffect2 parentMount")
    return () => console.log("parentEffect2 parentUnmount")
  }, [])

  useLayoutEffect(() => {
    console.log("parentLayoutEffect parentMount")
    return () => console.log("parentLayoutEffect parentUnmount")
  }, [])
  return <>parent --- {children}</>
}

const Child = () => {
  useEffect(() => {
    console.log("childEffect1 childMount")
    return () => console.log("childEffect1 childUnmount")
  }, [])

  useEffect(() => {
    console.log("childEffect2 childMount")
    return () => console.log("childEffect2 childUnmount")
  }, [])

  useLayoutEffect(() => {
    console.log("childLayoutEffect childMount")
    return () => console.log("childLayoutEffect childUnmount")
  }, [])
  return <>child</>
}

const EffectDemo = () => {
  const [bool, { toggle }] = useBoolean(true)
  return (
    <>
      <button onClick={toggle}>toggle</button>
      <hr />
      {bool && (
        <Parent>
          <Child />
        </Parent>
      )}
    </>
  )
}

export default EffectDemo
