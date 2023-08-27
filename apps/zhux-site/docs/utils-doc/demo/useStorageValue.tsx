/**
 * title : 使用示例
 * desc : 相比 useState，这个 hook 会将值存入 localStorage，页面刷新也能保持状态
 */
import React from "react"
import { StorageHelper } from "zhux-utils"
import { useStorageValue } from "zhux-utils-react"

const storageHelper = new StorageHelper("CUSTOM")

const BaseDemo = () => {
  const [storage, setStorage] = useStorageValue("USV", "hello")
  const [customStorage, setCustomStorage] = useStorageValue("USV", "hello", storageHelper)

  return (
    <>
      <fieldset>
        <legend>默认的 storageHelper</legend>
        <span>{JSON.stringify(storage)}</span>
        <hr />
        <div className="btn-wrapper">
          <span>set方式1:</span>
          <input type="text" value={storage} onChange={e => setStorage(e.target.value)} />
          <button onClick={() => setStorage(s => s + "1")}>set方式2</button>
        </div>
      </fieldset>
      <br />
      <fieldset>
        <legend>传入自定义的 storageHelper</legend>
        <span>{JSON.stringify(customStorage)}</span>
        <hr />
        <div className="btn-wrapper">
          <span>set方式1:</span>
          <input type="text" value={customStorage} onChange={e => setCustomStorage(e.target.value)} />
          <button onClick={() => setCustomStorage(s => s + "1")}>set方式2</button>
        </div>
      </fieldset>
    </>
  )
}

export default BaseDemo
