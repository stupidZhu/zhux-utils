/**
 * title : 基础示例
 * desc : 打开控制台查看是谁导致了重渲染
 */
import { useBoolean } from "ahooks"
import React from "react"
import { useWhyDidYouRender } from "zhux-utils-react"

const Children: React.FC<{ bool: boolean }> = props => {
  const [boolean, { toggle }] = useBoolean()

  useWhyDidYouRender("your key", { boolean, ...props })

  return <button onClick={toggle}>children toggle</button>
}

const BaseDemo = () => {
  const [boolean, { toggle }] = useBoolean()

  return (
    <div className="btn-wrapper">
      <button onClick={toggle}>parent toggle</button>
      <Children bool={boolean} />
    </div>
  )
}

export default BaseDemo
