import { useCallback, useEffect, useMemo, useState } from "react"
import { StorageHelper } from "zhux-utils"
import { IObj } from "zhux-utils/dist/type"
import { useConfigContext } from "../../component/ConfigProvider/ConfigProvider"
import { reactStorageHelper } from "../../util/bootstrap"
import useStoreState from "../useStoreState/useStoreState"

const useStorageState = <T extends IObj>(key: string, defaultValue: T, customStorageHelper?: StorageHelper) => {
  const { storageHelper: _storageHelper } = useConfigContext() ?? {}
  const storageHelper = useMemo(
    () => customStorageHelper ?? _storageHelper ?? reactStorageHelper,
    [_storageHelper, customStorageHelper]
  )
  const [state, setState] = useState<T>({ ...defaultValue, ...storageHelper.getItem(key) })

  const setField = useCallback(
    <K extends keyof T>(fieldKey: K | Partial<T> | ((v: T) => T), value?: T[K]) => {
      const rawData = storageHelper.getItem(key) ?? defaultValue
      if (typeof fieldKey === "string") setState({ ...rawData, [fieldKey]: value })
      else if (typeof fieldKey === "function") setState(fieldKey)
      else setState({ ...rawData, ...(fieldKey as Partial<T>) })
    },
    [defaultValue, key, storageHelper]
  )

  useEffect(() => {
    storageHelper.setItem(key, state)
  }, [key, state, storageHelper])

  useEffect(() => {
    console.warn("[zhux-utils-react - useStorageState] useStorageState 已被弃用，请使用 useStorageStore")
  }, [])

  return [state, setField] as const
}

export const useStorageStore = <T extends IObj>(key: string, defaultValue?: T, customStorageHelper?: StorageHelper) => {
  const { storageHelper: _storageHelper } = useConfigContext() ?? {}
  const storageHelper = useMemo(
    () => customStorageHelper ?? _storageHelper ?? reactStorageHelper,
    [_storageHelper, customStorageHelper]
  )

  const storeObj = useStoreState<T>({ ...(defaultValue ?? {}), ...storageHelper.getItem(key) })

  useEffect(() => {
    storageHelper.setItem(key, storeObj[0])
  }, [key, storageHelper, storeObj])

  return storeObj
}

export const useStorageValue = <T = unknown>(key: string, defaultValue?: T, customStorageHelper?: StorageHelper) => {
  const { storageHelper: _storageHelper } = useConfigContext() ?? {}
  const storageHelper = useMemo(
    () => customStorageHelper ?? _storageHelper ?? reactStorageHelper,
    [_storageHelper, customStorageHelper]
  )

  const stateObj = useState<T>(storageHelper.getItem(key) ?? defaultValue)

  useEffect(() => {
    storageHelper.setItem(key, stateObj[0])
  }, [key, stateObj, storageHelper])

  return stateObj
}

export default useStorageState
