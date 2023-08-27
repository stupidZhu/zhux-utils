import { useStorageStore, useStorageValue } from "zhux-utils-react"
import { storageHelper } from "../../bootstrap"

type StoreType = {
  name: string
  like: number[]
  obj: {
    hello: string
  }
}

const StorageHelperComp = () => {
  const [store, setStore] = useStorageStore<StoreType>("TTTT")
  const [state, setState] = useStorageValue<string>("SSSS")

  return (
    <div>
      <p>
        {store.name}---{store.obj?.hello}
      </p>
      <p>{state}</p>
      <button
        onClick={() => {
          storageHelper.setItem("HELLO", { hello: "hello" })
          storageHelper.removeItem("HEllO")
          console.log(storageHelper.getItem("HELLO"))
          console.log(storageHelper.key(0))
        }}
      >
        testRemove
      </button>

      <button
        onClick={() => {
          setStore({ name: "hello", obj: { hello: "world" } })
        }}
      >
        setStore
      </button>
      <button
        onClick={() => {
          setState("zhux")
          // console.log(storageHelper.getItem("SSSS"))
        }}
      >
        setState
      </button>
    </div>
  )
}

export default StorageHelperComp
