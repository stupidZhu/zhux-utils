---
title: RefPromiseHelper
---

# RefPromiseHelper

<code src="./demos/base.tsx"></code>

## props

/

## result

| 数据/方法   | 说明               | 类型                                               |
| :---------- | :----------------- | :------------------------------------------------- |
| addListener | 添加对一个值的监听 | `<T>(key: string, timeout?: number) => Promise<T>` |
| setRef      | 在合适的时间设置值 | `(key: string, value: any) => void`                |

## 备注

1. 如果 key 对应的值为 null（不调用 setRef 方法默认为 null），addListener 会在值*第一次*改变时 resolve；如果 key 对应的值不是 null，addListener 会直接 resolve
2. 如果不传 timeout 或者传入一个小于 0 的数，addListener 将会一直等待值变为非 null。否则将有可能超时触发 reject
