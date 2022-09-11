---
title: Type
---

# 公共类型

## 来自 `zhux-utils`

| 类型          | 定义                                                                   | 说明 |
| :------------ | :--------------------------------------------------------------------- | :--- |
| IObj          | `IObj<T = any> = Record<string, T>`                                    |      |
| IKey          | `string \| number`                                                     |      |
| ITimer        | `null \| NodeJS.Timeout`                                               |      |
| IOption       | `IOption<V = IKey, L = IKey> = { label: L; value: V } & IObj`          |      |
| PartialByKeys | `PartialByKeys<O, K extends keyof O> = Merge<Partial<O> & Omit<O, K>>` |      |

## 来自 `zhux-utils-react`

| 类型         | 定义                                                                                                         | 说明 |
| :----------- | :----------------------------------------------------------------------------------------------------------- | :--- |
| WithChildren | `{ children?: React.ReactNode \| undefined }`                                                                |      |
| LikeNull     | `undefined \| null`                                                                                          |      |
| IRef         | `IRef<T> = (() => T \| LikeNull) \| React.MutableRefObject<T \| LikeNull> \| React.RefObject<T \| LikeNull>` |      |
| ClassStyle   | `{ className?: string style?: React.CSSProperties }`                                                         |      |
