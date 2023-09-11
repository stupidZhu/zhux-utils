---
title: Type
toc: content
group:
  title: other
  order: 3
---

# 公共类型

## 来自 `zhux-utils`

| 类型                  | 定义                              |
| :-------------------- | :-------------------------------- |
| `IObj<T>`             | `Record<string, T>`               |
| `IKey`                | `string \| number`                |
| `ITimer`              | `null \| NodeJS.Timeout`          |
| `IOption<V, L>`       | `{ label: L; value: V } & IObj`   |
| `Merge<T>`            | `{ [K in keyof T]: T[K] }`        |
| `PartialByKeys<O, K>` | ` Merge<Partial<O> & Omit<O, K>>` |

## 来自 `zhux-utils-react`

| 类型                  | 定义                                                                                               |
| :-------------------- | :------------------------------------------------------------------------------------------------- |
| `WithChildren`        | `{ children?: React.ReactNode \| undefined }`                                                      |
| `LikeNull`            | `undefined \| null`                                                                                |
| `IRef<T>`             | `(() => T \| LikeNull) \| React.MutableRefObject<T \| LikeNull> \| React.RefObject<T \| LikeNull>` |
| `ClassStyle`          | `{ className?: string; style?: React.CSSProperties }`                                              |
| `CtrlProps<T>`        | `{ value?: T; defaultValue?: T; onChange?: (value: T, ...rest: any[]) => void }`                   |
| `OmitCtrlProps<T, K>` | `Omit<T, keyof CtrlProps \| K>`                                                                    |
| `CommonComProps<T>`   | `CtrlProps<T> & ClassStyle`                                                                        |
