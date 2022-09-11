/**
 * title: renderType 为 portal
 */
import React from "react"
import { ConfigProvider, CreatePortalHelper } from "zhux-utils-react"
import { MyDialog } from "./MyDialog"

const createPortalHelper = new CreatePortalHelper({
  renderType: "portal",
})

const PortalDemo = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* 这个一般写在 index.tsx / index.jsx 中 */}
      <ConfigProvider>
        <createPortalHelper.PortalRoot />
      </ConfigProvider>
      <button
        onClick={() =>
          createPortalHelper.add(
            <MyDialog title="Dialog!">
              <span> CreatePortalHelper 可以传入 Provider </span>
              <p>{Date.now()}</p>
            </MyDialog>,
            { key: "addDialog" }
          )
        }
      >
        打开一个 dialog（多次点击不重新渲染）
      </button>
      <button
        onClick={() =>
          createPortalHelper.add(<MyDialog title="Dialog!">hello --- {Date.now()}</MyDialog>, {
            key: "addDialog1",
            replace: true,
          })
        }
      >
        打开一个另一个 dialog（多次点击看看）
      </button>
      <button onClick={() => createPortalHelper.clear()}>关闭所有</button>
    </div>
  )
}

export default PortalDemo
