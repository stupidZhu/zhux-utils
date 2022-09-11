/**
 * title : 触底和自动滚动
 */
import React, { useRef, useState } from "react"
import { useScrollUtil } from "zhux-utils-react"
import "./index.scss"

const ReachDemo = () => {
  const reachSwitch = useRef(false)
  const ref = useRef<HTMLDivElement>(null)
  const funcRef = useRef<{ scroll: () => void; turnPage: () => void }>({ scroll: () => {}, turnPage: () => {} })

  const [verticalList, setVList] = useState(Array.from(Array(10)))
  const [horizontalList, setHList] = useState(Array.from(Array(10)))

  const { autoTurnPage } = useScrollUtil({
    scrollType: "vertical",
    scrollDom: () => document.querySelector(".scroll-wrapper")!,
    onReach(type) {
      if (type === "bottom" && reachSwitch.current) {
        setTimeout(() => {
          setVList(list => [...list, ...Array.from(Array(10))])
        }, 800)
      }
    },
  })
  const { autoScroll } = useScrollUtil({
    scrollType: "horizontal",
    scrollDom: ref,
    onReach(type) {
      if (type === "right" && reachSwitch.current) {
        setTimeout(() => {
          setHList(list => [...list, ...Array.from(Array(10))])
        }, 800)
      }
    },
  })
  return (
    <>
      <button
        onClick={() => {
          reachSwitch.current = !reachSwitch.current
          alert((reachSwitch.current ? "已开启" : "已关闭") + "触底自动加载")
        }}
      >
        切换是否触底自动加载
      </button>
      <p>纵向滚动</p>
      <div className="btn-wrapper">
        <button onClick={() => (funcRef.current.turnPage = autoTurnPage(2000))}>autoTurnPage</button>
        <button onClick={() => funcRef.current.turnPage()}>stopTurnPage</button>
      </div>
      <hr />
      <div className="scroll-wrapper">
        {verticalList.map((_, index) => {
          return (
            <div className="scroll-item" key={index}>
              {index}
            </div>
          )
        })}
      </div>
      <hr />
      <p>横向滚动</p>
      <div className="btn-wrapper">
        <button onClick={() => (funcRef.current.scroll = autoScroll())}>autoScroll</button>
        <button onClick={() => funcRef.current.scroll()}>stopScroll</button>
      </div>
      <hr />
      <div className="scroll-wrapper-h" ref={ref}>
        {horizontalList.map((_, index) => {
          return (
            <div className="scroll-item-h" key={index}>
              {index}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ReachDemo
