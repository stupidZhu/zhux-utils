/**
 * title : 使用示例
 * desc : 相比 [useStoreState](/util-doc/hook/use-store-state)，这个 hook 会将值存入 localStorage，页面刷新也能保持状态
 */
import React from "react"
import { StorageHelper } from "zhux-utils"
import { useStorageStore } from "zhux-utils-react"

const defaultValue = { str: "storage", num: 10, arr: [1, 2, 3], obj: { name: "storage" } }
const storageHelper = new StorageHelper("CUSTOM")

const BaseDemo = () => {
  const [storage, setStorage] = useStorageStore("USS", defaultValue)
  const [customStorage, setCustomStorage] = useStorageStore("USS", defaultValue, storageHelper)

  return (
    <>
      <fieldset>
        <legend>默认的 storageHelper</legend>
        <span>{JSON.stringify(storage)}</span>
        <hr />
        <div className="btn-wrapper">
          <span>set方式1:</span>
          <input
            type="text"
            value={storage.str}
            onChange={e => setStorage({ str: e.target.value, obj: { name: e.target.value } })}
          />
          <button onClick={() => setStorage(s => ({ ...s, num: s.num + 1 }))}>set方式2</button>
        </div>
      </fieldset>
      <br />
      <fieldset>
        <legend>传入自定义的 storageHelper</legend>
        <span>{JSON.stringify(customStorage)}</span>
        <hr />
        <div className="btn-wrapper">
          <span>set方式1:</span>
          <input
            type="text"
            value={customStorage.str}
            onChange={e => setCustomStorage({ str: e.target.value, obj: { name: e.target.value } })}
          />
          <button onClick={() => setCustomStorage(s => ({ ...s, num: s.num + 1 }))}>set方式2</button>
        </div>
      </fieldset>
    </>
  )
}

export default BaseDemo
