/**
 * title: hook 不一定要以 use 开头
 * desc: 这里 myHook 也可以正常使用，记得要关闭 eslint 检查。（这里的 [as const](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types) 是 ts 的类型断言）
 */
/* eslint-disable */
import React, { useState } from "react"

const myHook = () => {
  const [a, setA] = useState(false)
  return [a, setA] as const
}

const Demo = () => {
  const [a, setA] = myHook()
  return (
    <div>
      <button onClick={() => setA(a => !a)}>toggle</button>
      {a && <div>hello</div>}
    </div>
  )
}

export default Demo
