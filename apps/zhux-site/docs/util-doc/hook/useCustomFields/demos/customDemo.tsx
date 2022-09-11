/**
 * title: 自定义输入
 * desc: useCustomFields 自定义案例，理论上只要组件实现了 value 和 onChange 接口，都可以作为作为该 hook 的输入组件。这里简单地列举了一个图片选择器。如果使用了 type 请在入参中传入 defaultType ，不传默认为 undefined，不能通过非空检查。
 */
import React from "react"
import { useCustomFields } from "zhux-utils-react"
import { imgList } from "../../useCtrlComponent/demos/base"
import ImgPicker from "../../useCtrlComponent/demos/ImgPicker"

const CustomDemo = () => {
  const { fields, changeField, getFormatRes, checkNull } = useCustomFields({ defaultType: "text" })

  return (
    <div className="custom-fields-demo">
      {fields.map((item, index) => {
        return (
          <div className="field-item" key={item.id}>
            <select value={item.type} onChange={e => changeField("type", index, e.target.value)}>
              <option value="text">文本</option>
              <option value="img">图片</option>
            </select>
            <input
              type="text"
              value={item.label}
              onChange={e => changeField("label", index, e.target.value)}
              placeholder="请输入属性名"
            />
            {item.type === "text" && (
              <input
                type="text"
                value={item.value}
                onChange={e => changeField("value", index, e.target.value)}
                placeholder="请输入属性值"
              />
            )}
            {item.type === "img" && (
              <div className="img-picker-wrapper">
                <ImgPicker value={item.value} onChange={e => changeField("value", index, e)} imgList={imgList} />
              </div>
            )}
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

export default CustomDemo
