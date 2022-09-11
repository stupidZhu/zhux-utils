import React from "react"
import { useStoreState } from "zhux-utils-react"

const BaseDemo = () => {
  const [store, setStore] = useStoreState({ str: "store", num: 10, arr: [1, 2, 3], obj: { hello: "world" } })

  return (
    <div className="btn-wrapper">
      <span>set方式1:</span>
      <input type="text" value={store.str} onChange={e => setStore({ str: e.target.value })} />
      <button onClick={() => setStore("obj", store.obj.hello === "world" ? { hello: "store" } : { hello: "world" })}>
        set方式2
      </button>
      <button onClick={() => setStore(s => ({ ...s, num: s.num + 1 }))}>set方式3</button>
      <button onClick={() => console.log(store)}>打印</button>
    </div>
  )
}

export default BaseDemo
