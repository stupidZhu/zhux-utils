/**
 * title: useImperativeHandle
 * desc: 有两种导出子组件属性和方法的方式，我常用的是child1的这种，也是个人比较推荐的方式。当然此处也不一定要用 useRef 来接收 ref 的值，也可以是带 current 属性的对象或者一个函数。
 */
import React, { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react"

interface RefContent {
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
  func(): void
}

// ----------------------- child1 -----------------------

const Child1: React.FC<{ childRef: React.MutableRefObject<RefContent | undefined> }> = ({ childRef }) => {
  const [state, setState] = useState("hello")

  const func = useCallback(() => {
    alert("child1 !!!")
  }, [])

  useImperativeHandle(childRef, () => ({ state, setState, func }))

  return <p>{state}&emsp;child1</p>
}

// ----------------------- child2 -----------------------

let Child2: any = (_: any, ref: ForwardedRef<RefContent>) => {
  const [state, setState] = useState("hello")

  const func = useCallback(() => {
    alert("child2 !!!")
  }, [])

  useImperativeHandle(ref, () => ({ state, setState, func }))

  return <p>{state}&emsp;child2</p>
}

Child2 = forwardRef(Child2)

// ----------------------- parent -----------------------

const Parent = () => {
  const child1Ref = useRef<RefContent>()
  const child2Ref = useRef<RefContent>()

  return (
    <>
      <button onClick={() => child1Ref.current?.setState(child1Ref.current.state === "hello" ? "hi" : "hello")}>
        changeChild1
      </button>
      <button onClick={() => child1Ref.current?.func()}>child1Func</button>
      <Child1 childRef={child1Ref} />
      <button onClick={() => child2Ref.current?.setState(child2Ref.current.state === "hello" ? "hi" : "hello")}>
        changeChild2
      </button>
      <button onClick={() => child2Ref.current?.func()}>child2Func</button>
      <Child2 ref={child2Ref} />
    </>
  )
}

export default Parent
