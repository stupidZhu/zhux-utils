/**
 * title: 基础用法
 * desc: ImgPicker 内部使用了 useCtrlComponent，详见 ImgPicker。因为 useCtrlComponent 内部使用了 in 操作符，请直接传入 props 而不要解构。使用该 hook 的组件可以与 antd-Form 组件搭配使用。
 */
import React, { useState } from "react"
import { resourceUri } from "../../../common/var"
import ImgPicker from "./ImgPicker"
import "./index.scss"

export const imgList = [
  "/zhux-site/logoBlue.png",
  "/zhux-site/logoGreen.png",
  "/zhux-site/logoRed.png",
  "/zhux-site/logoYellow.png",
].map(item => `${resourceUri}${item}`)

const BaseDemo = () => {
  const [value, onChange] = useState<string>()

  return (
    <div className="common-com-demo">
      <div>
        <span>受控组件示例：</span>
        <button onClick={() => onChange(undefined)}>清除</button>
        <ImgPicker value={value} onChange={e => onChange(e)} imgList={imgList} />
      </div>
      <div>
        <span>非受控组件示例：</span>
        <ImgPicker defaultValue={`${resourceUri}/zhux-site/logoGreen.png`} onChange={console.log} imgList={imgList} />
      </div>
    </div>
  )
}

export default BaseDemo
