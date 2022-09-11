---
title: Hook -- 自定义 Hook
---

# 自定义 Hook

## 什么是自定义 Hook

个人理解，Hook 本质就是函数，是对特定功能的封装。

Hook 和普通函数的区别是

- Hook 要遵守 react 编写和使用 Hook 的原则
- Hook 内可以使用其他 Hook

## 编写和使用 Hook 的几个原则

- 只在 React 函数组件或者自定义 Hook 中调用 Hook
- 只在最顶层使用 Hook
- Hook 命名以 use 开头

## 为什么要使用自定义 Hook，何时使用自定义 Hook

上面说到 Hook 和函数差不多，Hook 的作用和优点也和函数差不多。

对于何时使用自定义 Hook，我个人的理解是，能使用函数实现的功能，不要使用 Hook 去实现

比如一个计算加法的函数，完全可以使用普通函数去实现，就没必要使用 Hook

```tsx | pure
const add = (a: number, b: number) => a + b

// 强行使用 Hook 就太奇怪了
const useAdd = (a: number, b: number) => {
  const [a] = useState(a)
  const [b] = useState(b)
  return useMemo(() => a + b, [a, b])
}
```

<hr/>

比如有一个专门改变页面 title 的函数

```tsx | pure
const setTitle = (title: string) => {
  document.title = title
}
```

你希望在页面进入的时候设置 title，页面离开的时候恢复 title

```tsx | pure
const title = useRef(document.title)

setTitle("new Title")

useEffect(() => {
  return () => {
    setTitle(title)
  }
}, [])
```

这里我们用到了 Hook，就可以考虑把这一系列操作封装成一个自定义 Hook

<code src="./demos/titleDemo.tsx"></code>

从上面的过程也可以看出，往往是先有一个需求，在实现这个需求后发现可以使用自定义 Hook 使其实现得更优雅，才有了自定义 Hook。

react 文档里面也提到

> 尽量避免过早地增加抽象逻辑。既然函数组件能够做的更多，那么代码库中函数组件的代码行数可能会剧增。这属于正常现象 —— 不必立即将它们拆分为 Hook。但我们仍鼓励你能通过自定义 Hook 寻找可能，以达到简化代码逻辑，解决组件杂乱无章的目的。

所以个人认为，自定义 Hook 是从业务中来，到业务中去的。自定义 Hook 往往来自于对业务代码的封装，而不能实际运用到业务中的 Hook 是没有意义的。

## 奇怪的实验

其实自定义 hook 不一定要以 use 开头，也不一定只能在最顶层使用 Hook

自定义 hook 可以不以 use 开头，[但强烈不建议这么做](https://zh-hans.reactjs.org/docs/hooks-custom.html#using-a-custom-hook)。

<code src="./demos/myHook.tsx"></code>

不一定只能在最顶层使用 Hook，[但强烈不建议这么做](https://react.docschina.org/docs/hooks-rules.html#explanation)。

<code src="./demos/effectDemo.tsx"></code>

hook 不规范，debug 两行泪。

## 求生欲拉满

以上便是我对自定义 Hook 的一点个人理解。水平有限，如果不对的地方，欢迎指正。
