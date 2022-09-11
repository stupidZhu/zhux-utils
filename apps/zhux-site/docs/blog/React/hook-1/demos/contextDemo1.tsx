/**
 * title: useContext
 * desc: useContext 的一个简单应用。
 */
import React, { createContext, useContext, useState } from "react"

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

const Name = () => {
  console.log("Name reRender")
  const { name, setName } = useContext(Context)

  return (
    <>
      <button onClick={() => setName(name => (name === "hello" ? "world" : "hello"))}>changeName</button>
      <p>name : {name}</p>
    </>
  )
}

const Age = () => {
  console.log("Age reRender")
  const { age, setAge } = useContext(Context)

  return (
    <>
      <button onClick={() => setAge(age => (age === 18 ? 81 : 18))}>changeAge</button>
      <p>age : {age}</p>
    </>
  )
}

const Info = () => {
  console.log("Info reRender")
  const { name, age } = useContext(Context)

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
  const [name, setName] = useState("hello")
  const [age, setAge] = useState(18)

  return (
    <>
      <Other />
      <hr />
      <Context.Provider value={{ name, setName, age, setAge }}>
        <Name />
        <hr />
        <Age />
        <hr />
        <Info />
      </Context.Provider>
    </>
  )
}

export default ContextDemo
