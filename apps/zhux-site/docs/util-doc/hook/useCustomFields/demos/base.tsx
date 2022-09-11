/**
 * title: 基础用法
 */
import React, { HTMLInputTypeAttribute } from "react"
import { useCustomFields } from "zhux-utils-react"
import "./index.scss"

const BaseCom = () => {
  const { fields, changeField, getFormatRes, checkNull } = useCustomFields({ defaultType: "number" })

  return (
    <div className="custom-fields-demo">
      {fields.map((item, index) => {
        return (
          <div className="field-item" key={item.id}>
            <select value={item.type} onChange={e => changeField("type", index, e.target.value)}>
              <option value="text">文本</option>
              <option value="number">数值</option>
              <option value="password">密码</option>
            </select>
            <input
              type="text"
              value={item.label}
              onChange={e => changeField("label", index, e.target.value)}
              placeholder="请输入属性名"
            />
            <input
              type={item.type as HTMLInputTypeAttribute}
              value={item.value}
              onChange={e => changeField("value", index, e.target.value)}
              placeholder="请输入属性值"
            />
            <button onClick={() => changeField("del", index)}>删除</button>
          </div>
        )
      })}
      <hr />
      <button onClick={() => changeField("add")}>新增</button>
      <button onClick={() => console.log(getFormatRes())}>打印结果</button>
      <button
        onClick={() => {
          const { flag, index, propName } = checkNull()
          if (flag) alert(`第${index + 1}项${propName}为空！`)
        }}
      >
        校验field
      </button>
    </div>
  )
}

export default BaseCom
