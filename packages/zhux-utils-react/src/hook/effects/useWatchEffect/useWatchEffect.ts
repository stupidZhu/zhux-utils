import { useEffect, useRef } from "react"
import { IRef, LikeNull } from "../../../type"
import { getCurrent } from "../../../util"

export const useWatchRefEffect = <T = any>(
  cb: (val: T | LikeNull, prevVal: T | LikeNull) => void | (() => void),
  dep: IRef<T> | undefined
) => {
  const depRef = useRef<T | LikeNull>()

  useEffect(() => {
    const _dep = dep ? getCurrent(dep) : dep

    if (_dep === depRef.current) return
    const prev = depRef.current
    depRef.current = _dep
    return cb(_dep, prev)
  }, [dep ? getCurrent(dep) : dep])
}

export const useWatchEffect = <T = any>(cb: (val: T | LikeNull, prevVal: T | LikeNull) => void | (() => void), dep: T) => {
  const depRef = useRef<T | LikeNull>()

  useEffect(() => {
    if (dep === depRef.current) return
    const prev = depRef.current
    depRef.current = dep
    return cb(dep, prev)
  }, [dep])
}
