---
order: 600
---

# useStorageState

<code src="./demos/base.tsx"></code>

## props

| 参数          | 说明                     | 类型                                               | 默认值      |
| :------------ | :----------------------- | :------------------------------------------------- | :---------- |
| key           | 存入 localStorage 的 key | `React.Key`                                        | 必填        |
| defaultValue  | 初始值                   | `T`                                                | 必填        |
| StorageHelper | 可以用来自定义前缀       | [`StorageHelper`](/util-doc/helper/storage-helper) | 前缀为 `ZU` |

## result

| 数据/方法              | 说明              | 类型                                                                                                 |
| :--------------------- | :---------------- | :--------------------------------------------------------------------------------------------------- |
| storage (result[0])    | 存入 storage 的值 | `T`                                                                                                  |
| setStorage (result[1]) | 修改 storage 的值 | `<K extends keyof T>(fieldKey: K \| Partial<T> \| ((v: T) => T), value?: T[K] \| undefined) => void` |
