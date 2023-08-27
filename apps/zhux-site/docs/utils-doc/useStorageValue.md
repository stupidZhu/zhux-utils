---
order: 700
toc: content
group:
  title: hooks
  order: 1
---

# useStorageValue

<code src="./demo/useStorageValue.tsx"></code>

## props

| 参数          | 说明                     | 类型                                               | 默认值      |
| :------------ | :----------------------- | :------------------------------------------------- | :---------- |
| key           | 存入 localStorage 的 key | `React.Key`                                        | 必填        |
| defaultValue  | 初始值                   | `T`                                                | 必填        |
| StorageHelper | 可以用来自定义前缀       | [`StorageHelper`](/util-doc/helper/storage-helper) | 前缀为 `ZU` |

## result

| 数据/方法 | 说明              | 类型                                |
| :-------- | :---------------- | :---------------------------------- |
| result[0] | 存入 storage 的值 | `T`                                 |
| result[1] | 修改 storage 的值 | `(val: T \| ((v: T) => T)) => void` |
