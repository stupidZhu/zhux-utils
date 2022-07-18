import { IObj } from "../../type"

class IObjStore<T extends IObj> {
  constructor(store: T) {
    this.store = store
  }

  store: T

  setStore(key: keyof T | Partial<T> | ((v: T) => T), value?: any) {
    if (typeof key === "string") this.store = { ...this.store, [key]: value }
    else if (typeof key === "function") this.store = key(this.store)
    else this.store = { ...this.store, ...(key as Partial<T>) }
  }
}

export default IObjStore
