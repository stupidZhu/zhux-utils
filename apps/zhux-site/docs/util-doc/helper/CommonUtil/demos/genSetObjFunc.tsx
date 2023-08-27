/**
 * title: genSetObjFunc
 * desc: 返回的函数类似 [useStoreState](/util-doc/hook/use-store-state) 返回的 setStore。但它不像 hook 一样只能用在组件中
 */

import React from "react"
import { CommonUtil } from "zhux-utils"

const obj = { name: "hello", age: 10, gender: false }
const refObj = { current: { name: "hello", age: 10, gender: false } }

const setObjFunc = CommonUtil.genSetObjFunc(obj)
const setRefObjFunc = CommonUtil.genSetRefObjFunc(refObj)

const GenSetObjFunc = () => {
  return (
    <>
      <fieldset>
        <legend>genSetObjFunc</legend>
        <div className="btn-wrapper">
          <button
            onClick={() => {
              setObjFunc({ age: obj.age + 1 })
              console.log(obj)
            }}
          >
            set方式1
          </button>
          <button
            onClick={() => {
              setObjFunc(o => (o.gender = !o.gender))
              console.log(obj)
            }}
          >
            set方式2
          </button>
        </div>
      </fieldset>
      <fieldset>
        <legend>setRefObjFunc</legend>
        <div className="btn-wrapper">
          <button
            onClick={() => {
              setRefObjFunc({ age: refObj.current.age + 1 })
              console.log(refObj.current)
            }}
          >
            set方式1
          </button>
          <button
            onClick={() => {
              setRefObjFunc(o => ({ ...o, gender: !o.gender }))
              console.log(refObj.current)
            }}
          >
            set方式2
          </button>
        </div>
      </fieldset>
    </>
  )
}

export default GenSetObjFunc
