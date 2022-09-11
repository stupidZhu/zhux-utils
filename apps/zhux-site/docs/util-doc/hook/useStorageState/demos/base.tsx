/**
 * title : 使用示例
 */
import React from "react"
import { StorageHelper } from "zhux-utils"
import { useStorageState } from "zhux-utils-react"

const defaultValue = { str: "storage", num: 10, arr: [1, 2, 3], obj: { hello: "world" } }
const storageHelper = new StorageHelper("CUSTOM")

const BaseDemo = () => {
  const [storage, setStorage] = useStorageState("TEST", defaultValue)
  const [customStorage, setCustomStorage] = useStorageState("TEST", defaultValue, storageHelper)

  return (
    <>
      <fieldset>
        <legend>默认的 storageHelper</legend>
        <div className="btn-wrapper">
          <span>set方式1:</span>
          <input type="text" value={storage.str} onChange={e => setStorage({ str: e.target.value })} />
          <button
            onClick={() => setStorage("obj", storage.obj.hello === "world" ? { hello: "storage" } : { hello: "world" })}
          >
            set方式2
          </button>
          <button onClick={() => setStorage(s => ({ ...s, num: s.num + 1 }))}>set方式3</button>
          <button onClick={() => console.log(storage)}>打印</button>
        </div>
      </fieldset>
      <br />
      <fieldset>
        <legend>传入自定义的 storageHelper</legend>
        <div className="btn-wrapper">
          <span>set方式1:</span>
          <input type="text" value={customStorage.str} onChange={e => setCustomStorage({ str: e.target.value })} />
          <button
            onClick={() => {
              setCustomStorage("obj", customStorage.obj.hello === "world" ? { hello: "storage" } : { hello: "world" })
            }}
          >
            set方式2
          </button>
          <button onClick={() => setCustomStorage(s => ({ ...s, num: s.num + 1 }))}>set方式3</button>
          <button onClick={() => console.log(customStorage)}>打印</button>
        </div>
      </fieldset>
    </>
  )
}

export default BaseDemo
