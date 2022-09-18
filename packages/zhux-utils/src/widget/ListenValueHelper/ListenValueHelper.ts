import { isNil } from "lodash"
import { IObj, ITimer } from "../../type"

class ListenValueHelper {
  private valueMap: Record<string, any> = new Proxy(
    {},
    {
      set: (obj: IObj, key: string, value: any) => {
        obj[key] = value
        if (!isNil(value)) this.doResolveFunc(key as string)
        return true
      },
    }
  )
  private resolveRejectMap: Record<
    string,
    { resolveFuncList: Array<((value: any) => void) | null>; rejectTimerList: ITimer[] }
  > = {}

  private doResolveFunc = (key: string) => {
    const resolveRejectObj = this.resolveRejectMap[key]
    if (!resolveRejectObj) return

    resolveRejectObj.resolveFuncList.forEach(item => item?.(this.getValue(key)))
    resolveRejectObj.rejectTimerList.forEach(item => item && clearTimeout(item))

    resolveRejectObj.resolveFuncList = []
    resolveRejectObj.rejectTimerList = []
  }

  addListener = <T>(key: string, timeout?: number, signal?: AbortSignal) => {
    if (!this.resolveRejectMap[key]) this.resolveRejectMap[key] = { resolveFuncList: [], rejectTimerList: [] }

    return new Promise<T>((resolve, reject) => {
      signal?.throwIfAborted()
      signal?.addEventListener("abort", () => reject(signal?.reason))

      if (!isNil(this.valueMap[key])) resolve(this.valueMap[key])
      else {
        const { resolveFuncList, rejectTimerList } = this.resolveRejectMap[key]
        const resolveFunc = (value: any) => resolve(value)
        resolveFuncList.push(resolveFunc)

        // timeout
        if (timeout && timeout > 0) {
          const timer = setTimeout(() => {
            reject(new Error("timeout"))
            const index = resolveFuncList.findIndex(item => item === resolveFunc)
            if (~index) resolveFuncList[index] = null
          }, timeout)
          rejectTimerList.push(timer)
        }
      }
    })
  }

  getValue = (key: string) => this.valueMap[key]
  setValue = (key: string, value: any) => (this.valueMap[key] = value)
}

export default ListenValueHelper
