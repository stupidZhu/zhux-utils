import classNames from "classnames"
import React from "react"
import { useCtrlComponent } from "zhux-utils-react"
import "./index.scss"

interface Props {
  imgList: string[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

const ImgPicker: React.FC<Props> = props => {
  const { imgList } = props
  const [value, onChange] = useCtrlComponent<string>(props)

  return (
    <div className="img-picker">
      {imgList.map((item, index) => {
        return (
          <div key={index} className={classNames("img-item", { active: value === item })} onClick={() => onChange(item)}>
            <img src={item} alt="" />
          </div>
        )
      })}
    </div>
  )
}

export default ImgPicker
