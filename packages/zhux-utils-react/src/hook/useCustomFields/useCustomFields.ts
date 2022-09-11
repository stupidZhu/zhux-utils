import { cloneDeep } from "lodash"
import React, { useCallback } from "react"
import { IObj } from "zhux-utils/dist/type"
import useCtrlComponent from "../useCtrlComponent/useCtrlComponent"

export type CustomFieldItem = { type?: React.Key; id: React.Key; label: React.Key; value: any } & IObj
export type ChangeFieldFunc = (changeType: "value" | "label" | "type" | "del" | "add", index?: number, value?: any) => void
type CheckNullFunc = (properties?: Array<keyof CustomFieldItem>) => {
  flag: boolean
  propName: keyof CustomFieldItem | ""
  index: number
}

export interface UseCustomFieldsOptions {
  value?: CustomFieldItem[]
  defaultValue?: CustomFieldItem[]
  defaultType?: React.Key
  onChange?: (fields: CustomFieldItem[]) => void
  formatter?: (field: CustomFieldItem) => any
}

const useCustomFields = (options: UseCustomFieldsOptions = {}) => {
  const { defaultType, formatter } = options
  const [fields, setFields] = useCtrlComponent<CustomFieldItem[]>(options, { defaultValue: [] })

  const changeField: ChangeFieldFunc = useCallback(
    (changeType, index = -1, value) => {
      const _fields = [...fields]
      if (changeType === "del") _fields.splice(index, 1)
      else if (changeType === "add") {
        _fields.push({ label: "", value: undefined, type: defaultType, id: Date.now() + Math.random() })
      } else {
        const item = _fields[index]
        if (item) item[changeType] = value
        if (changeType === "type") item.value = undefined
      }
      setFields(_fields)
    },
    [defaultType, fields, setFields]
  )

  const checkNull: CheckNullFunc = useCallback(
    (properties = ["type", "label", "value"]) => {
      let flag = false,
        propName: keyof CustomFieldItem | "" = "",
        index = -1

      for (let i = 0; i < fields.length; i++) {
        for (let j = 0; j < properties.length; j++) {
          const item = fields[i][properties[j]]
          if (typeof item === "undefined" || item == null || item === "") {
            flag = true
            propName = properties[j]
            index = i
            break
          }
        }
        if (flag) break
      }

      return { flag, propName, index }
    },
    [fields]
  )

  const getFormatRes = useCallback(() => {
    const _fields = cloneDeep(fields)
    if (!formatter) return _fields
    return _fields.map(formatter)
  }, [fields, formatter])

  return { fields, changeField, getFormatRes, checkNull }
}

export default useCustomFields
