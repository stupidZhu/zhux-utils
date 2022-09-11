import dayjs from "dayjs"
import { useEffect, useState } from "react"
import useMemoValue from "../useMemoValue/useMemoValue"

interface UseDateTimeOptions<T extends string | string[]> {
  formatter?: T
  interval?: number
}

// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#handbook-content
type StrOrArr<T extends string | string[]> = T extends string ? string : string[]

const genCurTimeObj = (formatter: string | string[]) => {
  const date = new Date()
  let formatRes: string | string[]
  if (Array.isArray(formatter)) {
    formatRes = []
    formatter.forEach(item => {
      ;(formatRes as string[]).push(dayjs(date).format(item))
    })
  } else formatRes = dayjs(date).format(formatter)

  return [formatRes, date]
}

const useDateTime = <T extends string | string[]>(options: UseDateTimeOptions<T> = {}): [StrOrArr<T>, Date] => {
  // eslint-disable-next-line prefer-const
  let { formatter = "YYYY-MM-DD HH:mm:ss", interval = 1000 } = options
  if (interval < 1000) interval = 1000

  const [curTimeObj, setCurTimeObj] = useState(genCurTimeObj(formatter) as [StrOrArr<T>, Date])

  useEffect(() => {
    setCurTimeObj(genCurTimeObj(formatter) as [StrOrArr<T>, Date])
    const timer = setInterval(() => setCurTimeObj(genCurTimeObj(formatter) as [StrOrArr<T>, Date]), interval)
    return () => clearInterval(timer)
  }, [useMemoValue(formatter), interval])

  return curTimeObj
}

export default useDateTime
