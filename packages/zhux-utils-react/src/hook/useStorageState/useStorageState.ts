import { useCallback, useEffect, useMemo, useState } from "react"
import { StorageHelper } from "zhux-utils"
import { IObj } from "zhux-utils/dist/type"
import { useConfigContext } from "../../component/ConfigProvider/ConfigProvider"
import { reactStorageHelper } from "../../util/bootstrap"

const useStorageState = <T extends IObj>(key: string, defaultValue: T, customStorageHelper?: StorageHelper) => {
  const { storageHelper: _storageHelper } = useConfigContext() ?? {}
  const storageHelper = useMemo(() => customStorageHelper ?? _storageHelper ?? reactStorageHelper, [customStorageHelper])
  const [state, setState] = useState<T>({ ...defaultValue, ...storageHelper.getItem(key) })

  const setField = useCallback(
    <K extends keyof T>(fieldKey: K | Partial<T> | ((v: T) => T), value?: T[K]) => {
      const rawData = storageHelper.getItem(key, defaultValue)
      if (typeof fieldKey === "string") setState({ ...rawData, [fieldKey]: value })
      else if (typeof fieldKey === "function") setState(fieldKey)
      else setState({ ...rawData, ...(fieldKey as Partial<T>) })
    },
    [defaultValue, key, storageHelper]
  )

  useEffect(() => {
    storageHelper.setItem(key, state)
  }, [key, state, storageHelper])

  return [state, setField] as const
}

export default useStorageState
