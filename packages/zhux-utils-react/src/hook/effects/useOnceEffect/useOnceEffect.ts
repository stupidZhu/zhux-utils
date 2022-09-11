import { DependencyList, EffectCallback, useEffect, useRef } from "react"
import { IRef } from "../../../type"
import { getCurrent } from "../../../util"

const useOnceEffect = (cb: EffectCallback, dep?: DependencyList, condition?: IRef<boolean>) => {
  const ref = useRef(true)
  useEffect(() => {
    const c = condition ? getCurrent(condition) && ref.current : ref.current
    if (c) {
      ref.current = false
      return cb()
    }
  }, dep)
}

export default useOnceEffect
