import { useCallback, useState } from "react"
import { IObj } from "zhux-utils/dist/type"

const useStoreState = <T extends IObj = IObj>(value: T) => {
  const [state, _setState] = useState(value)

  const setState = useCallback(<K extends keyof T>(key: K | Partial<T> | ((v: T) => T), value?: T[K]) => {
    if (typeof key === "string") _setState(v => ({ ...v, [key]: value }))
    else if (typeof key === "function") _setState(key)
    else _setState(v => ({ ...v, ...(key as Partial<T>) }))
  }, [])

  return [state, setState] as const
}

export default useStoreState
