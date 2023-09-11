---
nav: Doc
toc: content
group:
  title: utils
  order: 1
---

# CatchHelper

参考了 [react-query](https://github.com/tanstack/query) 实现的简单的缓存工具

<code src="./demo/CatchHelper.tsx"></code>

## result

| 数据/方法 | 说明                                                          | 类型                                                                 |
| :-------- | :------------------------------------------------------------ | :------------------------------------------------------------------- |
| get       | 获取缓存值，如果值已经缓存，则第二个参数无效                  | `<T>(key: any[], cb?: () => T \| Promise<T>): Promise<T\|undefined>` |
| add       | 新增/设置 缓存值，无论该 key 的值是否被缓存，都会更新缓存的值 | `<T>(key: any[], value: T): T`                                       |
| remove    | 移除缓存值                                                    | `(key: any[]) => void`                                               |
| clear     | 清空缓存                                                      | `() => void`                                                         |
