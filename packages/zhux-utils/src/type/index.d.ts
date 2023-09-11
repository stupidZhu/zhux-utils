export type IObj<T = any> = Record<string, T>
export type IKey = string | number
export type ITimer = null | NodeJS.Timeout
export type IOption<V = IKey, L = IKey> = { label: L; value: V } & IObj

export type Merge<T> = {
  [K in keyof T]: T[K]
}
export type PartialByKeys<O, K extends keyof O> = Merge<Partial<O> & Omit<O, K>>

export as namespace ZhuxUtils
