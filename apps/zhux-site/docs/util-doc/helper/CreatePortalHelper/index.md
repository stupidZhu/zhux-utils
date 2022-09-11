---
title: CreatePortalHelper
---

# CreatePortalHelper

<code src="./demos/base.tsx"></code>

如果 CreatePortalHelper 的 renderType 为 `render`，内部渲染调用的方法为`ReactDOM.render`, 你可以给它传入一个 Provider。

```tsx | pure
export const createPortalHelper = new CreatePortalHelper({
  renderType: "render",
  Provider: ({ children }) => (
    <Provider1>
      <Provider2>
        <Provider3>{children}</Provider3>
      </Provider2>
    </Provider1>
  ),
})
```

如果 CreatePortalHelper 的 renderType 为 `portal`，内部渲染调用的方法为`ReactDOM.createPortal`,你需要把 `createPortalHelper.PortalRoot` 写在组件中，不必传入 Provider，它可以使用你的组件的 Provider。

```tsx | pure
const createPortalHelper = new CreatePortalHelper({ renderType: "portal" })

ReactDOM.render(
  <React.StrictMode>
    <Provider1>
      <Provider2>
        <Provider3>
          <createPortalHelper.PortalRoot />
          <App />
        </Provider3>
      </Provider2>
    </Provider1>
  </React.StrictMode>,
  document.getElementById("root")
)
```

默认值 `{ renderType: "render" }`

<code src="./demos/withDialog.tsx"></code>

<code src="./demos/configDemo.tsx"></code>

<code src="./demos/portalDemo.tsx"></code>

## props

| 参数       | 说明                                          | 类型               | 默认值   |
| :--------- | :-------------------------------------------- | :----------------- | :------- |
| rootKey    | 渲染容器的 id（不传会自动生成一个）           | `string`           | /        |
| renderType | 渲染类型                                      | `render \| portal` | `render` |
| Provider   | renderType 为 render 时，如果需要的话可以传入 | `React.FC`         | /        |

## result

| 数据/方法 | 说明 | 类型                                                                             |
| :-------- | :--- | :------------------------------------------------------------------------------- |
| add       | 新增 | `(com: React.ReactNode, option?: { key?: string; replace?: boolean }) => string` |
| remove    | 移除 | `(key: string) => boolean \| Promise<boolean>`                                   |
| clear     | 清空 | `() => boolean \| Promise<boolean>`                                              |
| setConfig | 配置 | `(config?: Partial<WrapperConfig>) => void`                                      |

## 备注

- WrapperConfig 的类型为

```ts
interface WrapperConfig {
  reverse: boolean // 默认 false
  maxCount: number // 默认 10
  removeDelay: number // 默认 300
}
```

- reverse 的值代表新增加的 Portal 渲染在最前面还是最后面，在 toast 等情形下可能有用
- 如果 removeDelay 的值为 0 ，则 remove/clear 返回的结果为 `boolean` ，否则为 `Promise<boolean>`
