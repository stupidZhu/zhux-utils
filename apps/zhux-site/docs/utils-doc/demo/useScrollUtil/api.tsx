/**
 * title : 基本用法
 * desc : 基本使用和一些 api
 */
import React, { useRef } from "react"
import { useScrollUtil } from "zhux-utils-react"
import "./index.scss"

const ApiDemo = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { getScrollInfo, scrollPixel, turnPage } = useScrollUtil({
    scrollType: "vertical",
    scrollDom: ref,
  })

  return (
    <>
      <div className="btn-wrapper">
        <button onClick={() => console.log(getScrollInfo())}>打印 ScrollInfo</button>
        <button onClick={() => scrollPixel("next", 50)}>向下滚动50px</button>
        <button onClick={() => turnPage("next")}>向下滚动翻页</button>
      </div>
      <hr />
      <div className="scroll-wrapper-api" ref={ref}>
        {Array.from(Array(30)).map((_, index) => {
          return (
            <div className="scroll-item" key={index}>
              {index}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ApiDemo
