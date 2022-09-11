import { isEqual } from "lodash"
import { useRef } from "react"

const useMemoValue = <T extends {}>(value: T) => {
  const ref = useRef(value)
  if (!isEqual(value, ref.current)) ref.current = value
  return ref.current
}

export default useMemoValue
