/**
 * title: abortablePromise （可以中止的 promise）
 * desc: 基于 [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController) 实现。返回一个包含 promise 和 abortController 的对象，可以调用 abortController 的 abort 方法中止 promise，中止的 promise 会直接 reject
 */

import React, { useRef } from "react"
import { CommonUtil } from "zhux-utils"

const getPromise = () => {
  return new Promise<number>(resolve => {
    setTimeout(() => resolve(Math.random()), 5000)
  })
}

const AbortablePromise = () => {
  const ref = useRef<{
    promise: Promise<number>
    abortController: AbortController
  } | null>(null)

  return (
    <div className="btn-wrapper">
      <button
        onClick={() => {
          if (ref.current) return alert("存在一个进行中的promise，请等它执行完毕或者手动中止！")
          const res = CommonUtil.abortablePromise(getPromise())
          ref.current = res
          res.promise
            .then(n => {
              console.log(n)
              ref.current = null
            })
            .catch(console.error)
        }}
      >
        get promise
      </button>
      <button
        onClick={() => {
          ref.current?.abortController.abort({ type: "abort", msg: "abort!!!" })
          ref.current = null
        }}
      >
        abort promise
      </button>
    </div>
  )
}

export default AbortablePromise
