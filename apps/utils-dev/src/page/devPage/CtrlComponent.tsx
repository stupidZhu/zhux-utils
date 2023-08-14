import React, { useState } from "react"
import { CommonComProps } from "zhux-utils-react/dist/type"
import useCtrlComponent from "./useCtrlComponent"

interface CounterProps extends CommonComProps<number> {}

const Counter: React.FC<CounterProps> = props => {
  // const [value, onChange] = useControllableValue<number>(props, { defaultValue: 0 })
  const [value, onChange] = useCtrlComponent<number>(props, { defaultValue: 0 })

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <button onClick={() => onChange(v => v - 1)}>-</button>
      <span>{value}</span>
      <button onClick={() => onChange(v => v + 1)}>+</button>
      <button
        onClick={() => {
          Array.from(Array(5)).forEach(() => onChange(v => v + 1))
        }}
      >
        + 5
      </button>
      <button
        onClick={() => {
          Array.from(Array(5)).forEach(() => onChange(v => v - 1))
        }}
      >
        - 5
      </button>
    </div>
  )
}

const CtrlComponent = () => {
  const [value, onChange] = useState(0)
  return <Counter value={value} onChange={(v, ...rest) => {}} />
}

export default CtrlComponent
