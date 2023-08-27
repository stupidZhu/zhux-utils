import { useEffect, useMemo, useState } from "react"
import { StorageHelper } from "zhux-utils"
import { useConfigContext } from "../../component/ConfigProvider/ConfigProvider"
import { reactStorageHelper } from "../../util/bootstrap"

const useStorageValue = <T = unknown>(key: string, defaultValue?: T, customStorageHelper?: StorageHelper) => {
  const { storageHelper: _storageHelper } = useConfigContext() ?? {}
  const storageHelper = useMemo(
    () => customStorageHelper ?? _storageHelper ?? reactStorageHelper,
    [_storageHelper, customStorageHelper]
  )

  const stateObj = useState<T | undefined>(storageHelper.getItem<T>(key) ?? defaultValue)

  useEffect(() => {
    storageHelper.setItem(key, stateObj[0])
  }, [key, stateObj, storageHelper])

  return stateObj
}

export default useStorageValue
