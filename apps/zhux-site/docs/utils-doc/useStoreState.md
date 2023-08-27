---
order: 500
toc: content
group:
  title: hooks
  order: 1
---

# useStoreState

<code src="./demo/useStoreState.tsx"></code>

## props

| 参数  | 说明   | 类型 | 默认值 |
| :---- | :----- | :--- | :----- |
| value | 初始值 | `T`  | 必填   |

## result

| 数据/方法 | 说明            | 类型                                         |
| :-------- | :-------------- | :------------------------------------------- |
| result[0] | store 的值      | `T`                                          |
| result[1] | 修改 store 的值 | `(val: Partial<T> \| ((v: T) => T)) => void` |
