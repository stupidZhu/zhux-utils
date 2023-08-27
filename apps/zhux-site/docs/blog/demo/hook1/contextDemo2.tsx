/**
 * title: useContext 的一种实践
 * desc: 把状态的相关逻辑提取到 ContextProvider，就不会出现上面那种不必要的重渲染。
 */
import React, { createContext, useContext, useState } from "react"
import { WithChildren } from "zhux-utils-react/dist/type"

type SetStateProp<T> = T | ((v: T) => T)

const Context = createContext<{
  name: string
  setName(v: SetStateProp<string>): void
  age: number
  setAge(v: SetStateProp<number>): void
}>({
  name: "hello",
  setName() {},
  age: 18,
  setAge() {},
})

const ContextProvider: React.FC<WithChildren> = ({ children }) => {
  const [name, setName] = useState("hello")
  const [age, setAge] = useState(18)

  return <Context.Provider value={{ name, setName, age, setAge }}>{children}</Context.Provider>
}

const useMyContext = () => useContext(Context)

const Name = () => {
  console.log("Name reRender")
  const { name, setName } = useMyContext()

  return (
    <>
      <button onClick={() => setName(name => (name === "hello" ? "world" : "hello"))}>changeName</button>
      <p>name : {name}</p>
    </>
  )
}

const Age = () => {
  console.log("Age reRender")
  const { age, setAge } = useMyContext()

  return (
    <>
      <button onClick={() => setAge(age => (age === 18 ? 81 : 18))}>changeAge</button>
      <p>age : {age}</p>
    </>
  )
}

const Info = () => {
  console.log("Info reRender")
  const { name, age } = useMyContext()

  return (
    <p>
      name : {name} --- age : {age}
    </p>
  )
}

const Other = () => {
  console.log("other reRender")

  return <p>other component ...</p>
}

const ContextDemo = () => {
  console.log("ContextDemo reRender")

  return (
    <>
      <Other />
      <hr />
      <ContextProvider>
        <Name />
        <hr />
        <Age />
        <hr />
        <Info />
      </ContextProvider>
    </>
  )
}

export default ContextDemo
