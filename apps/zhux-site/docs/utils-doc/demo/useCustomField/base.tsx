/**
 * title: 基础用法
 * desc: 实现一个新增用户的 demo
 */

import classNames from "classnames"
import React, { useState } from "react"
import { useCustomFields } from "zhux-utils-react"
import { CommonComProps } from "zhux-utils-react/dist/type"
import { IKey } from "zhux-utils/dist/type"
import "./index.scss"

export type FieldItem = { name: string; age?: number; gender?: number }

const checkFields = (fields: Array<FieldItem & { _key: IKey }>) => {
  let key: IKey | undefined = undefined
  for (const i of fields) {
    if (!i.name || typeof i.age === "undefined" || typeof i.age === "undefined") {
      key = i._key
      break
    }
  }
  return key
}

type BaseDemoProps = Omit<CommonComProps<Array<FieldItem & { _key: IKey }>>, "className" | "style">

const BaseDemo: React.FC<BaseDemoProps> = props => {
  const [fields, changeFields] = useCustomFields<FieldItem>({ templateItem: { name: "", gender: 2 }, ...props })
  const [editKey, setEditKey] = useState<IKey>("")

  return (
    <div className="custom-fields-demo">
      {fields.map(item => {
        return (
          <div className={classNames("field-item", { editing: editKey === item._key })} key={item._key}>
            <input
              value={item.name}
              onChange={e => changeFields("edit", { ...item, name: e.target.value })}
              placeholder="名字"
            />
            <input
              type="number"
              value={item.age}
              onChange={e => changeFields("edit", { ...item, age: +e.target.value })}
              placeholder="年龄"
            />
            <select value={item.gender} onChange={e => changeFields("edit", { ...item, gender: +e.target.value })}>
              <option value={0}>女</option>
              <option value={1}>男</option>
              <option value={2}>保密</option>
            </select>
            {editKey === item._key ? (
              <i className="iconfont pop-iconsave-fill" onClick={() => setEditKey("")} />
            ) : (
              <>
                <i
                  className="iconfont pop-iconedit-fill"
                  onClick={() => setEditKey(item._key)}
                  style={{ pointerEvents: "auto" }}
                />
                <i className="iconfont pop-icondelete-fill" onClick={() => changeFields("del", item)} />
              </>
            )}
          </div>
        )
      })}
      <hr />
      <button
        disabled={!!editKey}
        onClick={() => {
          const key = checkFields(fields)
          if (key) {
            alert("请完成前一个")
            setEditKey(key)
            return
          }
          setEditKey(changeFields("add")!)
        }}
      >
        add
      </button>
      <button onClick={() => console.log(fields)}>print</button>
    </div>
  )
}

export default BaseDemo
