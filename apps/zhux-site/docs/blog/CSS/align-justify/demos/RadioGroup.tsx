import classNames from "classnames"
import React from "react"
import { useCtrlComponent } from "zhux-utils-react"
import { CommonComProps } from "zhux-utils-react/dist/type"
import { IOption } from "zhux-utils/dist/type"
import "./index.scss"

interface Props extends CommonComProps<IOption> {
  name: string
  radios: IOption[]
}

const RadioGroup: React.FC<Props> = props => {
  const { radios, name, className, style } = props
  const [value, onChange] = useCtrlComponent<IOption>(props)

  return (
    <div className={classNames("radio-group", className)} style={style}>
      {radios.map(item => {
        return (
          <div className="radio-item" key={item.value} onClick={() => onChange(item)}>
            <input type="radio" name={name} value={item.value} checked={value?.value === item.value} readOnly />
            <label>{item.label}</label>
          </div>
        )
      })}
    </div>
  )
}

export default RadioGroup
