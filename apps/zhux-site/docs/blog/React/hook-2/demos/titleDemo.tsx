/**
 * title: useTitle
 * desc: 当 titleDemo 出现时会改变页面 title ，销毁时页面 title 会恢复
 */
import { useBoolean } from "ahooks"
import React, { useEffect, useRef, useState } from "react"

const useTitle = (title: string, recover = true) => {
  const oldTitle = useRef(document.title)
  document.title = title

  useEffect(() => {
    return () => {
      if (recover) document.title = oldTitle.current
    }
  }, [])
}

const TitleDemo = () => {
  const [title, setTitle] = useState("hello")
  useTitle(title)
  return (
    <>
      <span>titleDemo</span>
      <button onClick={() => setTitle(title => (title === "hello" ? "world" : "hello"))}>toggleTitle</button>
    </>
  )
}

const Demo = () => {
  const [visible, { toggle }] = useBoolean(false)
  return (
    <>
      <button onClick={toggle}>toggleVisible</button>
      <hr />
      {visible && <TitleDemo />}
    </>
  )
}

export default Demo
