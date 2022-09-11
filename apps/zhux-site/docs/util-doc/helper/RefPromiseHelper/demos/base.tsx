/**
 * title: RefPromiseHelper
 * desc: 打开控制台查看（此处 refPromiseHelper 是全局的，当你离开这个页面再回来时会发现它会直接打印三次结果）
 */

import React, { useEffect } from "react"
import { RefPromiseHelper } from "zhux-utils"

const refPromiseHelper = new RefPromiseHelper()

const BaseDemo = () => {
  useEffect(() => {
    setTimeout(() => {
      refPromiseHelper.setRef("test", { hello: "test" })
    }, 5000)

    refPromiseHelper.addListener("test").then(console.log)
    refPromiseHelper.addListener("test", 3000).then(console.log).catch(console.error)
    refPromiseHelper.addListener("hello").then(console.log)
  }, [])

  return (
    <div>
      <button onClick={() => refPromiseHelper.setRef("hello", { hello: "hello" })}>setHello</button>
    </div>
  )
}

export default BaseDemo
