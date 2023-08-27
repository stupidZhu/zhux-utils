import { useMemoizedFn } from "ahooks"
import { merge } from "lodash"
import { useState } from "react"
import { IObj } from "zhux-utils/dist/type"

const useStoreState = <T extends IObj = IObj>(value: T) => {
  const [state, _setState] = useState(value)

  const setState = useMemoizedFn((val: Partial<T> | ((v: T) => T)) => {
    if (typeof val === "function") _setState(val)
    else _setState(v => ({ ...merge(v, val) }))
  })

  return [state, setState] as const
}

export default useStoreState
