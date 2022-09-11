import { isNil } from "lodash"
import { IObj, ITimer } from "../../type"

class RefPromiseHelper {
  private refMap: Record<string, { current: any }> = new Proxy(
    {},
    {
      set: (obj: IObj, prop: string, value: { current: any }) => {
        const valueProxy = new Proxy(value, {
          set: (_obj: IObj, _prop: string, _value) => {
            _obj[_prop] = _value
            if (!isNil(_value)) this.doResolveFunc(prop as string)
            return true
          },
        })
        if (!isNil(value.current)) this.doResolveFunc(prop as string)
        obj[prop] = valueProxy
        return true
      },
    }
  )

  private resolveFuncMap: Record<string, Array<(() => void) | null>> = {}
  private rejectTimerMap: Record<string, ITimer[]> = {}

  private doResolveFunc = (key: string) => {
    this.resolveFuncMap[key]?.forEach(item => item?.())
    Reflect.deleteProperty(this.resolveFuncMap, key)

    this.rejectTimerMap[key]?.forEach(item => item && clearTimeout(item))
    Reflect.deleteProperty(this.rejectTimerMap, key)
  }

  addListener = <T>(key: string, timeout?: number): Promise<T> => {
    return new Promise((resolve, reject) => {
      if (!isNil(this.refMap[key]?.current)) resolve(this.refMap[key].current)
      else {
        if (isNil(this.refMap[key])) this.refMap[key] = { current: null }
        if (isNil(this.resolveFuncMap[key])) this.resolveFuncMap[key] = []
        const resolveFunc = () => resolve(this.refMap[key].current)
        this.resolveFuncMap[key].push(resolveFunc)
        // timeout
        if (timeout && timeout > 0) {
          const timer = setTimeout(() => {
            const index = this.resolveFuncMap[key]?.findIndex(item => item === resolveFunc)
            if (~index) {
              this.resolveFuncMap[key][index] = null
              reject(new Error("timeout"))
            }
          }, timeout)
          if (isNil(this.rejectTimerMap[key])) this.rejectTimerMap[key] = []
          this.rejectTimerMap[key].push(timer)
        }
      }
    })
  }

  setRef = (key: string, value: any) => {
    this.refMap[key] ? (this.refMap[key].current = value) : (this.refMap[key] = { current: value })
  }
}

export default RefPromiseHelper
