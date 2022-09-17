import { IObj } from "../../type"

const addCacheWrapper = <T extends (...rest: any[]) => any>(func: T): T => {
  const cache: IObj = {}

  return function (...rest: any[]) {
    const key = JSON.stringify(rest)
    if (cache[key]) return cache[key]
    cache[key] = (func as unknown as Function)(...rest)
    return cache[key]
  } as T
}

const genSetRefObjFunc = <T extends IObj>(obj: { current: T }) => {
  return <K extends keyof T>(key: K | Partial<T> | ((v: T) => T), value?: T[K]) => {
    if (typeof key === "string") {
      if (typeof value === "undefined") Reflect.deleteProperty(obj.current, key)
      else obj.current = { ...obj.current, [key]: value }
    } else if (typeof key === "function") obj.current = key(obj.current)
    else obj.current = { ...obj.current, ...(key as Partial<T>) }
  }
}

const genSetObjFunc = <T extends IObj>(obj: T) => {
  return <K extends keyof T>(key: K | Partial<T> | ((v: T) => void), value?: T[K]) => {
    if (typeof key === "string") {
      if (typeof value === "undefined") Reflect.deleteProperty(obj, key)
      else obj[key as keyof T] = value
    } else if (typeof key === "function") key(obj)
    else Object.entries(key).map(<Key extends keyof T>([k, v]: [Key, T[Key]]) => (obj[k] = v))
  }
}

const parseJson = <T = any>(json: string): T | null => {
  let res: T | null = null
  if (!json) return res
  try {
    res = JSON.parse(json)
  } catch (e) {
    console.error(e)
  }
  return res
}

const getDom = (id: string, className?: string) => {
  let dom = document.querySelector(`#${id}`)
  if (!dom) {
    dom = document.createElement("div")
    dom.id = id
    document.body.appendChild(dom)
  }
  className && dom.classList.add(className)
  return dom as HTMLDivElement
}

// https://juejin.cn/post/7140558929750130719
const abortablePromise = <T>(promise: Promise<T>) => {
  const abortController = new AbortController()
  const { signal } = abortController

  return {
    promise: new Promise<T>((resolve, reject) => {
      signal.addEventListener("abort", () => reject(signal?.reason))
      promise.then(resolve).catch(reject)
    }),
    abortController,
  }
}

export default { addCacheWrapper, abortablePromise, genSetRefObjFunc, genSetObjFunc, parseJson, getDom }
