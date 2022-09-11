/**
 * title : 封装一个 ScrollWrapper
 * desc : 即使一开始 scrollItem 不足以撑起 ScrollWrapper，仍然可以正常触发 onReach
 */
import React, { useRef, useState } from "react"
import { ScrollWrapper, useScrollUtil } from "zhux-utils-react"
import "./index.scss"
const ScrollWrapperDemo = () => {
  const scrollRef = useRef<ReturnType<typeof useScrollUtil>>()
  const [list, setList] = useState(Array.from(Array(1)))

  return (
    <>
      <button onClick={() => console.log(scrollRef.current?.getScrollInfo())}>打印 scrollInfo</button>
      <hr />
      <ScrollWrapper
        scrollType="vertical"
        className="scroll-wrapper"
        scrollRef={scrollRef}
        onReach={type => {
          if (type === "bottom") {
            setTimeout(() => {
              setList(list => [...list, ...Array.from(Array(10))])
            }, 800)
          }
        }}
      >
        {list.map((_, index) => {
          return (
            <div className="scroll-item" key={index}>
              {index}
            </div>
          )
        })}
      </ScrollWrapper>
    </>
  )
}

export default ScrollWrapperDemo
