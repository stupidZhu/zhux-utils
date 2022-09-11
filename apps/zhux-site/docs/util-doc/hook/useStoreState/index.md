---
order: 500
---

# useStoreState

<code src="./demos/base.tsx"></code>

## props

| 参数  | 说明   | 类型 | 默认值 |
| :---- | :----- | :--- | :----- |
| value | 初始值 | `T`  | 必填   |

## result

| 数据/方法            | 说明            | 类型                                                                                            |
| :------------------- | :-------------- | :---------------------------------------------------------------------------------------------- |
| store (result[0])    | store 的值      | `T`                                                                                             |
| setStore (result[1]) | 修改 store 的值 | `<K extends keyof T>(key: K \| Partial<T> \| ((v: T) => T), value?: T[K] \| undefined) => void` |
