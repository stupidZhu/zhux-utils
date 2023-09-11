---
toc: content
group:
  title: utils
  order: 1
---

# ListenValueHelper

基于 promise 对值进行监听。如果值已经存在，则直接 resolve，否则等待 setValue 调用且值不为 null/undefined 时 resolve

超时或者主动中止会导致 promise reject，如果设置超时时间<=0，等同于不会超时

<code src="./demo/ListenValueHelper.tsx"></code>

## props

/

## result

| 数据/方法   | 说明               | 类型                                                                     |
| :---------- | :----------------- | :----------------------------------------------------------------------- |
| addListener | 添加对一个值的监听 | `<T>(key: string, timeout?: number, signal?: AbortSignal) => Promise<T>` |
| setValue    | 在合适的时间设置值 | `(key: string, value: any) => void`                                      |
| getValue    | 获取值             | `(key: string) => any`                                                   |
