/**
 * title: CreatePortalHelper
 */
import React from "react"
import { CreatePortalHelper } from "zhux-utils-react"
import "./index.scss"

const createPortalHelper = new CreatePortalHelper({ renderType: "render" })

const BaseDemo = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <button
        onClick={() => createPortalHelper.add(<div className="base-item">hello --- {Date.now()}</div>, { key: "baseDemo" })}
      >
        添加一个 Portal（key一样则多次只有第一次点击有效）
      </button>
      <button
        onClick={() => {
          createPortalHelper.add(
            <div className="base-item" style={{ top: 100 }}>
              hello --- {Date.now()}
            </div>,
            { key: "baseDemoReplace", replace: true }
          )
        }}
      >
        添加一个 Portal（传入 replace: true，使新的 portal 替换旧的）
      </button>
      <button
        onClick={() => {
          createPortalHelper.remove("baseDemoReplace")
          createPortalHelper.remove("baseDemo")
          // 或者 createPortalHelper.clear()
        }}
      >
        移除 Portal（你也可以在生成时不传入key，add 会自动生成一个并返回）
      </button>
    </div>
  )
}

export default BaseDemo
