/**
 * title: ListenValueHelper
 * desc: 打开控制台查看（此处 listenValueHelper 是全局的，当你离开这个页面再回来时会发现它会直接打印）。同时参考 fetch 中 [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController) 的使用实现了中止监听的功能。
 */

import React, { useEffect } from "react"
import { ListenValueHelper } from "zhux-utils"

const listenValueHelper = new ListenValueHelper()

const BaseDemo = () => {
  useEffect(() => {
    const ac = new AbortController()

    setTimeout(() => listenValueHelper.setValue("test", { test: "test" }), 5000)

    // 五秒钟后打印
    listenValueHelper.addListener("test", 0, ac.signal).then(console.log).catch(console.error)
    // 三秒钟后超时
    listenValueHelper.addListener("test", 3000, ac.signal).then(console.log).catch(console.error)
    // 点击 setHello 按钮后打印
    listenValueHelper.addListener("hello", 0, ac.signal).then(console.log).catch(console.error)
    return () => {
      // 组件销毁时中止所有监听
      ac.abort("destroy")
    }
  }, [])

  return <button onClick={() => listenValueHelper.setValue("hello", { hello: "hello" })}>setHello</button>
}

export default BaseDemo
