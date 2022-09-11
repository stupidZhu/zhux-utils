import { cloneDeep } from "lodash"
import { IObj } from "../../type"

export type IFormat = {
  submit?: (val: any | undefined, result: IObj, rawData: IObj) => any
  detail?: (val: any | undefined, result: IObj, rawData: IObj) => any
}

export interface FormatItem {
  fields: string[]
  format: IFormat
}

export const genFormatMap = (formatList: FormatItem[]) => {
  const res: IObj<IFormat> = {}
  formatList.forEach(item => {
    item.fields.forEach(field => {
      res[field] = item.format
    })
  })
  return res
}

export interface FormatDataProps {
  data: IObj
  module: string
  type: keyof IFormat
  formatMap: IObj<IFormat>
}

export const formatData = ({ data, module, type, formatMap }: FormatDataProps) => {
  const rawData = cloneDeep(data)
  const result: IObj = {}
  Object.entries(rawData).forEach(([k, v]) => {
    const key = `${module}/${k}`
    const format = formatMap[key]
    if (format?.[type]) result[k] = format[type]!(v, result, rawData)
    else result[k] = v
  })
  return result
}

export default { genFormatMap, formatData }
