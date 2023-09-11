import { Button, Form } from "antd"
import React, { useState } from "react"
import { useCtrlComponent } from "zhux-utils-react"
import { CtrlProps } from "zhux-utils-react/dist/type"
import { MultiInput, MultiNumber } from "./MultiInputs"

interface CounterProps extends CtrlProps<number> {}

const Counter: React.FC<CounterProps> = props => {
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
  return (
    <>
      <Counter value={value} onChange={onChange} />
      <br />
      <Counter />
      <br />
      <Form onFinish={console.log}>
        <Form.Item name="multiInput" label="multiInput">
          <MultiInput />
        </Form.Item>
        <Form.Item name="multiNumber" label="multiNumber">
          <MultiNumber />
        </Form.Item>
        <Button htmlType="submit">submit</Button>
      </Form>
    </>
  )
}

export default CtrlComponent
