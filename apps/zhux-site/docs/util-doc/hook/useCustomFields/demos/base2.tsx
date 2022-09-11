/**
 * title: 基础用法
 * desc: 也可以不渲染type部分，单纯地作为 属性名-属性值 输入器来使用。如果要忽略 fields 里面的 id 和 type，或者有其他自定义需求，可以传入一个 formatter。 如果要忽略对 fields 里面的某些字段的检查，可以在 checkNull 里面传入需要检查的字段的数组。
 */
import React from "react"
import { useCustomFields } from "zhux-utils-react"

const BaseDemo2 = () => {
  const { fields, changeField, getFormatRes, checkNull } = useCustomFields({
    formatter: field => ({ label: field.label, value: field.value }),
  })

  return (
    <div className="custom-fields-demo">
      {fields.map((item, index) => {
        return (
          <div className="field-item" key={item.id}>
            <input
              type="text"
              value={item.label}
              onChange={e => changeField("label", index, e.target.value)}
              placeholder="请输入属性名"
            />
            <input
              type="text"
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
          const { flag, index, propName } = checkNull(["label", "value"])
          if (flag) alert(`第${index + 1}项${propName}为空！`)
        }}
      >
        校验field
      </button>
    </div>
  )
}

export default BaseDemo2
