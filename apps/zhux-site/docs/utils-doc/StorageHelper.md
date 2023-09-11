---
toc: content
group:
  title: utils
  order: 1
---

# StorageHelper

<code src="./demo/StorageHelper.tsx"></code>

## props

| 参数   | 说明                        | 类型                   | 默认值    |
| :----- | :-------------------------- | :--------------------- | :-------- |
| prefix | 前缀                        | `string`               | /         |
| type   | localStorage/sessionStorage | `"local" \| "session"` | `"local"` |

## result

| 数据/方法    | 说明                          | 类型                                                                                |
| :----------- | :---------------------------- | :---------------------------------------------------------------------------------- |
| getItem      | 获取一项                      | `(key: React.Key) => any`                                                           |
| setItem      | 新增一项                      | `(key: React.Key, value: any, _expire?: DurationUnitsObjectType \| number) => void` |
| removeItem   | 移除项目                      | `(keys: React.Key) => void`                                                         |
| clear        | 移除所有以`prefix`开头的项    | `() => void`                                                                        |
| keys         | 返回所有以`prefix`开头的`key` | `(withPrefix?: boolean) => string[]`                                                |
| key / length | 同 localStorage 原生方法      | `(keys: React.Key[]) => void`                                                       |

## 备注

- 如果传入 prefix 则存储的项目的 key 为 `${prefix}_${key}` ,不传则为 key

- setItem 的 \_expire 可以传 dayjs.duration 支持的[对象参数](https://day.js.org/docs/zh-CN/durations/creating)，或者一个数值（毫秒为单位，1000 代表 1s 后失效）

- 只能存储 json 支持的数据类型
