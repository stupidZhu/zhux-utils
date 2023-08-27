/**
 * title : gridDemo
 * desc : 最后一个 radio 置空，*-self 只添加在第二排子元素，第三排子元素设置了宽高填满栅格
 */
import { pickBy } from "lodash"
import React, { Fragment, useMemo, useState } from "react"
import { IObj } from "zhux-utils/dist/type"
import { radioList } from "./data"
import RadioGroup from "./RadioGroup"

const GridDemo = () => {
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
        <span>grid-wrapper-height:</span>
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
      <div className="grid-wrapper" style={wrapperStyle}>
        <div className="grid-item">
          <p>gridItem</p> - 0
        </div>
        {Array.from(Array(2)).map((_, index) => {
          return (
            <div className="grid-item" key={index} style={itemStyle}>
              gridItem - {index + 1}
            </div>
          )
        })}
        <div className="grid-item" style={itemStyle}>
          <p>gridItem</p> - 4
        </div>
        {Array.from(Array(2)).map((_, index) => {
          return (
            <div className="grid-item" key={index}>
              gridItem - {index + 5}
            </div>
          )
        })}
        {Array.from(Array(2)).map((_, index) => {
          return (
            <div className="grid-item-1" key={index}>
              gridItem - {index + 7}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default GridDemo
