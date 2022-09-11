---
title: StorageHelper
---

# StorageHelper

<code src="./demos/base.tsx"></code>

## props

| 参数   | 说明 | 类型     | 默认值 |
| :----- | :--- | :------- | :----- |
| prefix | 前缀 | `string` | /      |

## result

| 数据/方法                         | 说明                     | 类型                                                                                |
| :-------------------------------- | :----------------------- | :---------------------------------------------------------------------------------- |
| getItem                           | 获取一项                 | `<T>(key: React.Key, defaultValue?: T) => T`                                        |
| setItem                           | 新增一项                 | `(key: React.Key, value: any, _expire?: DurationUnitsObjectType \| number) => void` |
| removeItems                       | 移除项目                 | `(keys: React.Key[]) => void`                                                       |
| removeItem / clear / key / length | 同 localStorage 原生方法 | `(keys: React.Key[]) => void`                                                       |

## 备注

- 如果传入 prefix 则存储的项目的 key 为 `${prefix}_${key}` ,不传则为 key

- removeItem 为 localStorage 原生方法，不会自动拼上 prefix

- setItem 的 \_expire 可以传 dayjs.duration 支持的[对象参数](https://day.js.org/docs/zh-CN/durations/creating)，或者一个数值（毫秒为单位，1000 代表 1s 后失效）
