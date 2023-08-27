/**
 * title: 配置项
 */

import React, { useRef } from "react"
import { ConfigProvider, CreatePortalHelper } from "zhux-utils-react"
import { MyDialog } from "./MyDialog"

const createPortalHelper = new CreatePortalHelper({
  renderType: "render",
  Provider: ({ children }) => <ConfigProvider>{children}</ConfigProvider>,
})
createPortalHelper.setConfig({ maxCount: 3, removeDelay: 1000 })

const ConfigDemo = () => {
  const keys = useRef<string[]>([])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <button
        onClick={() => {
          createPortalHelper
            .add(
              <MyDialog title="Dialog!" removeDelay={1000}>
                <span>如果不指定key，则会随机生成一个并返回。这里设置了 maxCount = 3，removeDelay = 1000</span>
              </MyDialog>
            )
            .then(({ key, flag }) => {
              key && keys.current.push(key)
            })
        }}
      >
        打开一个 dialog
      </button>
      <button
        onClick={() => {
          createPortalHelper
            .add(
              <MyDialog title="Dialog!" removeDelay={1000}>
                <span>如果 dialog 数量超过 maxCount，会自动关闭最先生成的 dialog（注意这并不会移除你 keys 里面的值）</span>
              </MyDialog>,
              { replace: true }
            )
            .then(({ key, flag }) => {
              key && keys.current.push(key)
            })
        }}
      >
        replace 为 true 的情况
      </button>
      <button onClick={() => createPortalHelper.remove(keys.current.pop() ?? "")}>关闭最先生成的 dialog</button>
      <button onClick={() => createPortalHelper.clear()}>关闭所有</button>
    </div>
  )
}

export default ConfigDemo
