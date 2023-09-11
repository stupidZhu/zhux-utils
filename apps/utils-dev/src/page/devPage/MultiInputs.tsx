import { Input, InputNumber, InputNumberProps, InputProps } from "antd"
import classNames from "classnames"
import { cloneDeep } from "lodash"
import React, { Fragment, useMemo } from "react"
import { useCtrlComponent } from "zhux-utils-react"
import { CtrlProps, OmitCtrlProps } from "zhux-utils-react/dist/type"
import "./index.scss"

export interface MultiInputProps extends CtrlProps<string[]>, OmitCtrlProps<InputProps, "placeholder"> {
  count?: number
  separate?: string
  placeholder?: string[] | string
}

export interface MultiNumberProps extends CtrlProps<(number | null)[]>, OmitCtrlProps<InputNumberProps, "placeholder"> {
  count?: number
  separate?: string
  placeholder?: string[] | string
}

export type MultiInputsProps = { type: "input"; props: MultiInputProps } | { type: "number"; props: MultiNumberProps }

export const MultiInputs: React.FC<MultiInputsProps> = ({ type, props }) => {
  const {
    count = 2,
    separate = "-",
    className,
    style,
    placeholder,
    value: $1,
    onChange: $2,
    defaultValue: $3,
    ...rest
  } = props
  const [value, onChange] = useCtrlComponent<string[]>(props, {
    defaultValue: Array.from({ length: count }).map(() => ""),
  })

  const Com = useMemo(() => (type === "input" ? Input : InputNumber), [type]) as React.FC<any>

  return (
    <div className={classNames(`rca-multi-${type}`, className)} style={style}>
      {Array.from({ length: count }).map((_, index) => {
        return (
          <Fragment key={index}>
            <Com
              value={value[index]}
              placeholder={Array.isArray(placeholder) ? placeholder[index] : placeholder}
              onChange={(e: any) => {
                const _value = cloneDeep(value)
                _value[index] = e?.target?.value ?? e
                onChange(_value)
              }}
              {...rest}
            />
            {index !== count - 1 && <span className="rca-input-separate">{separate}</span>}
          </Fragment>
        )
      })}
    </div>
  )
}

export const MultiInput: React.FC<MultiInputProps> = props => <MultiInputs type="input" props={props} />

export const MultiNumber: React.FC<MultiNumberProps> = props => <MultiInputs type="number" props={props} />
