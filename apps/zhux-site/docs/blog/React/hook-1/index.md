---
title: Hook -- 内置 Hook
---

# Hook -- 内置 Hook

## [React 内置了哪些 Hook ？](https://react.docschina.org/docs/hooks-reference.html)

- useState 用于管理组件内部状态，setState 会触发组件重渲染。
- useEffect 用于执行副作用，在渲染后执行某些操作。
- useRef 返回一个可变的 ref 对象，对象在组件的整个生命周期内保持不变。
- useContext 获取 Provider 提供的 value，在嵌套比较深的组件树中传递状态非常有用。
- useMemo 返回一个缓存过的值，该值在依赖项改变时才重新计算（类似 vue 的 computed 属性？）。
- useCallback 返回一个缓存过的函数，useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。
- useImperativeHandle 使父组件或外部拿到子组件内的属性或方法的一个 Hook。
- useReducer 用于管理组件内部的状态，熟悉 redux 的同学可能会比较熟悉。很少用，不了解。
- useLayoutEffect 在所有的 DOM 变更之后才触发的 effect？很少用，不了解。
- useDebugValue 可用于在 React 开发者工具中显示自定义 Hook 的标签。很少用，不了解。

## 关于 useState（useReducer）

<!-- TODO: 关于同步和异步 -->

```tsx | pure
const [state, setState] = useState()
```

Reacter 对于这个 Hook 应该是相当了解了，这里就不多说了，但有两点值得注意。

- setState 的参数是 `S | ((prevState: S) => S)`，意味着你可以给 setState 传递一个函数，这个函数的的第一个参数是当前最新的 state 值，需要返回一个新的 state（注意对象是引用类型，只改变对象的属性不会触发组件更新），这在某些情况下会很有用。

  - [在定时器中 setState](https://zh-hans.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often)

  ```tsx | pure
  const [state, setState] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setState(s => s + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  ```

  - 需要获取到之前的 state 值

  ```tsx | pure
  const [visible, setVisible] = useState()
  const toggleVisible = () => {
    setVisible(v => !v)
    // 等同于 setVisible(!visible)
  }
  ```

  - 这也带来了一个问题，如果你要在 state 中存入一个函数，你可能需要这样写（应该没什么人往 state 里面存函数吧 🤣）

  ```tsx | pure
  const [func, setFunc] = useState()
  setFunc(() => () => {
    // pass
  })
  ```

- [惰性初始化 state](https://zh-hans.reactjs.org/docs/hooks-reference.html#lazy-initial-state)

  ```tsx | pure
  // 下面的写法 someExpensiveComputation 只会执行一次
  const [state, setState] = useState(() => {
    const initialState = someExpensiveComputation(props)
    return initialState
  })
  // ----------------------------
  // 下面的写法 someExpensiveComputation 会在每次组件重渲染时都执行一次（不必要的调用），尽管它只在初始渲染时有用
  const initialState = someExpensiveComputation(props)
  const [state, setState] = useState(initialState)
  ```

关于[useReducer](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer)，因为平时几乎没有使用过，也就不多说了 😳。

## 关于 useEffect（useLayoutEffect）

关于 useEffect，Reacter 应该也是十分了解了，这里就不多说了

useEffect 在浏览器渲染完成后执行，useLayoutEffect 在浏览器渲染前执行，[官方文档描述](https://zh-hans.reactjs.org/docs/hooks-reference.html#timing-of-effects)。

<code src="./demos/effectDemo1.tsx"></code>

<code src="./demos/effectDemo2.tsx"></code>

官方文档中说到

> 在函数组件主体内（这里指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性。<br/>使用 useEffect 完成副作用操作。赋值给 useEffect 的函数会在组件渲染到屏幕之后执行。你可以把 effect 看作从 React 的纯函数式世界通往命令式世界的逃生通道。

那么什么是副作用？参考[什么是纯函数？它函数式编程的基础](https://zhuanlan.zhihu.com/p/139659155) 对纯函数的解释，我认为 React 函数组件的作用就是渲染组件，其他的操作都算是副作用，比如网络请求，打印日志等，如果要处理这些副作用，就把它们放到 useEffect 中（纯属个人理解，如果不对，那就不对 😂）。

## 关于 useMemo 和 useCallback

### useMemo

熟悉 vue 的朋友应该知道 vue 有个 computed，官方文档上说计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。所以我个人觉得 useMemo 就有点类似于 vue 的计算属性，只在依赖变化的情况下重新求值。

但是 useMemo 需要我们手动传入依赖项数组，用起来就没那么方便，但是 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)可以帮助我们检查依赖项是否完整，官方也指出可能在未来实现自动创建依赖数组。但是手动添加依赖数组也给 useMemo 带来了更高的灵活性。

- 如果 useMemo 中用到了某个值，但当该值改变时我们不希望 useMemo 重新计算，可以选择不把该值放到 useMemo 的依赖数组中，在该值发生改变时 useMemo 不会重新计算。
- 如果 useMemo 没有用到某个值，但当该值改变时我们希望 useMemo 重新计算，可以选择把该值放到 useMemo 的依赖数组中，在该值发生改变时强制 useMemo 重新计算。

<code src="./demos/memoDemo1.tsx"></code>

### useCallback

useCallback 类似 useMemo。useMemo 用于缓存值，useCallback 用于缓存函数。

在平时写项目时你几乎不会用到这个 hook，但是当你在写一个自定义 hook 时，hook 里面定义的函数并返回的函数一定要使用 useCallback 包装，因为用户有可能把这个函数放到 useEffect 或者 useMemo 的依赖数组中，如果用户这么做了，而这个函数又没有使用 useCallback 包装，就有可能造成不必要的重渲染，甚至无限循环。

<code src="./demos/memoDemo2.tsx"></code>

## 关于 useRef 和 useImperativeHandle

### useRef

使用 useRef 访问 DOM 或者保存一个值大家应该都知道了，我就不多说了。

当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。之前我会把 ref 的值放到 useEffect 的依赖数组中的，后来才知道变更 .current 属性不会引发组件重新渲染，这种行为根本没有意义 🤦‍♂️。

```tsx | pure
// 首先 useEffect 执行时已经可以访问到绑定了 dom 的 ref 的值了，其次 .current 属性不会引发组件重新渲染
const Component = () => {
  const dom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(dom.current)
    // do something
  }, [dom]) // or [dom.current]

  return <div ref={dom}></div>
}
```

如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，可以试试[回调 ref](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)。

<!-- TODO: 他们的执行顺序 -->
<!-- TODO: 关于为什么叫 current -->

<code src="./demos/refDemo1.tsx"></code>

### useImperativeHandle

这个 Hook 可能大家用的比较少，但它确实非常好用！

vue 面试时经常问到父子组件传值的问题。子组件如何访问父组件的属性和方法，父组件如何访问子组件的属性和方法。。。 这个 Hook 就可以让父组件访问子组件的属性和方法！

<code src="./demos/refDemo2.tsx"></code>

## 关于 useContext

这个 Hook 可以用来传递和管理状态。虽然大家对于状态管理可能更多依赖于 redux 或者 mobx 之类的状态管理库，但 useContext 也有他自己的应用场景。就比如你在开发一个基于 React 的组件库，你应该优先选择 useContext 来管理状态，这样可以减少依赖，减少打包文件的大小。看下面这个例子。

<code src="./demos/contextDemo1.tsx"></code>

其实上面的对于 useContext 的应用有个有个问题，每当 setName 或者 setAge 时，Other 组件都会重渲染（见控制台）。Other 组件并不依赖 Context 的任意一项，这就属于不必要的重渲染。重渲染是因为直接由 ContextDemo 来管理状态，setName 或者 setAge 时 ContextDemo 会重渲染，从而导致所有子组件重渲染。针对这种情况，你可以用 [React.memo](https://zh-hans.reactjs.org/docs/react-api.html#reactmemo) 包裹 Other 组件，但我更推荐以下写法：

<code src="./demos/contextDemo2.tsx"></code>

<!-- https://github.com/facebook/react/issues/15156#issuecomment-474590693 -->

## 求生欲拉满

以上便是我对 React Hook 的一点个人理解。水平有限，如果不对的地方，欢迎指正。
