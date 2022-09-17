import React, { createContext, useCallback, useContext, useRef } from "react"
import { StorageHelper } from "zhux-utils"
import { WithChildren } from "../../type"
import { reactStorageHelper } from "../../util/bootstrap"

interface ConfigContextDialogField {
  getMaxZIndex(): string
  addKey(key: React.Key): void
  delKey(key: React.Key): void
}

interface ConfigContextType {
  dialogField: ConfigContextDialogField
  storageHelper: StorageHelper
}

const ConfigContext = createContext<ConfigContextType | null>(null)

interface ConfigProviderProps extends WithChildren {
  initMaxZIndex?: number
  storageHelper?: StorageHelper
}

export const ConfigProvider: React.FC<ConfigProviderProps> = props => {
  const { children, initMaxZIndex = 1000, storageHelper = reactStorageHelper } = props
  const maxZIndex = useRef<number>(initMaxZIndex)
  const dialogCollection = useRef<Set<React.Key>>(new Set([]))

  const getMaxZIndex = useCallback(() => {
    maxZIndex.current += 1
    return String(maxZIndex.current)
  }, [])

  const addKey = useCallback((key: React.Key) => dialogCollection.current.add(key), [])

  const delKey = useCallback(
    (key: React.Key) => {
      dialogCollection.current.delete(key)
      if (dialogCollection.current.size <= 0) maxZIndex.current = initMaxZIndex
    },
    [initMaxZIndex]
  )

  return (
    <ConfigContext.Provider value={{ dialogField: { getMaxZIndex, addKey, delKey }, storageHelper }}>
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfigContext = () => {
  const context = useContext(ConfigContext)
  if (!context) console.warn("[ConfigProvider] 请使用 ConfigProvider 以体验 zhux-utils-react 完整功能。")
  return context
}
