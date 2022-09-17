import { useEffect, useState } from "react"
import { useAsyncMemo } from "zhux-utils-react"

const promiseFunc = (length: number): Promise<Function> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random()
      console.log(random)
      // random > 0.9 ? resolve(Array.from(Array(length), (_, i) => i)) : reject("error")
      random > 0.9
        ? resolve(() => {
            console.log("hello")
          })
        : reject("error")
      // reject("error")
    }, 1000)
  })
}

const Memo = () => {
  const [arrLength, setArrLength] = useState(1)
  const { value, status } = useAsyncMemo(() => promiseFunc(arrLength), [arrLength], { defaultValue: () => {} })

  useEffect(() => {
    console.log(status)
  }, [status])

  return (
    <div>
      <button onClick={() => setArrLength(v => v + 1)}>curLength-{arrLength}</button>
      {/* {value?.map(item => (
        <p key={item}>item-{item}</p>
      ))} */}
      <button
        onClick={() => {
          console.log(value)
          value?.(123)
        }}
      >
        call func
      </button>
    </div>
  )
}

export default Memo
