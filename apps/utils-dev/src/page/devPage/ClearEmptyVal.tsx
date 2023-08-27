import { CommonUtil } from "zhux-utils"

const data = {
  a: "",
  b: " ",
  c: "$$ ",
  d: "1 ",
  e: null,
  f: undefined,
  g: "hello",
}

const ClearEmptyVal = () => {
  return (
    <div>
      <button
        onClick={() => {
          const res1 = CommonUtil.clearEmptyVal(data)
          const res2 = CommonUtil.clearEmptyVal(data, { clearEmptyStr: false })
          const res3 = CommonUtil.clearEmptyVal(data, { clearSpace: false })
          const res4 = CommonUtil.clearEmptyVal(data, { clearEmptyStr: false, clearSpace: false })
          const res5 = CommonUtil.clearEmptyVal(data, {
            customCb: (k, v) => k !== "g",
          })

          console.log(
            res1, // { d: '1', g: 'hello'}
            res2, // {a: '', b: '', d: '1', g: 'hello'}
            res3, // {b: ' ', c: '$$ ', d: '1 ', g: 'hello'}
            res4, // {a: '', b: ' ', c: '$$ ', d: '1 ', g: 'hello'}
            res5 // {d: '1'}
          )
        }}
      >
        test
      </button>
    </div>
  )
}

export default ClearEmptyVal
