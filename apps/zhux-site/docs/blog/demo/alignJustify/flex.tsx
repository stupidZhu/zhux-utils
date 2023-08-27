/**
 * title : flexDemo
 * desc : 最后一个 radio 置空，*-self 只添加在第二排子元素，第三排子元素没有设置 flex-basis
 */

import { pickBy } from "lodash"
import React, { Fragment, useMemo, useState } from "react"
import { IObj } from "zhux-utils/dist/type"
import { radioList } from "./data"
import "./index.scss"
import RadioGroup from "./RadioGroup"

const FlexDemo = () => {
  const [_wrapperStyle, setWrapperStyle] = useState<IObj>({})
  const [_itemStyle, setItemStyle] = useState<IObj>({})

  const wrapperStyle = useMemo(() => pickBy(_wrapperStyle), [_wrapperStyle])
  const itemStyle = useMemo(() => pickBy(_itemStyle), [_itemStyle])

  return (
    <>
      {radioList.map(item => {
        return (
          <Fragment key={item.name}>
            <div style={{ display: "flex", gap: 10 }}>
              <span>{item.name}:</span>
              <RadioGroup
                radios={item.radios}
                name={item.name}
                onChange={e => {
                  if (["alignSelf", "justifySelf", "placeSelf"].includes(item.name)) {
                    setItemStyle(v => ({ ...v, [item.name]: e.value }))
                  } else setWrapperStyle(v => ({ ...v, [item.name]: e.value }))
                }}
              />
            </div>
            <hr />
          </Fragment>
        )
      })}
      <div style={{ display: "flex", gap: 10 }}>
        <span>flex-wrapper-height:</span>
        <RadioGroup
          radios={[
            { label: "300px", value: 300 },
            { label: "auto", value: "auto" },
          ]}
          name="wrapperHeight"
          onChange={e => setWrapperStyle(v => ({ ...v, height: e.value }))}
        />
      </div>
      <hr />
      <div className="flex-wrapper" style={wrapperStyle}>
        <div className="flex-item">
          <p>flexItem</p> - 0
        </div>
        {Array.from(Array(3)).map((_, index) => {
          return (
            <div className="flex-item" key={index}>
              flexItem - {index + 1}
            </div>
          )
        })}
        <div className="flex-item" style={itemStyle}>
          <p>flexItem</p> - 4
          <br />
        </div>
        {Array.from(Array(3)).map((_, index) => {
          return (
            <div className="flex-item" key={index} style={itemStyle}>
              flexItem - {index + 5}
            </div>
          )
        })}
        {Array.from(Array(4)).map((_, index) => {
          return (
            <div className="flex-item-1" key={index} style={itemStyle}>
              flexItem - {index + 9}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default FlexDemo
