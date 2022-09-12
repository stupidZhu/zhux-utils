import { useDateTime } from "zhux-utils-react"

const App = () => {
  const [time] = useDateTime()

  return <div>{time}</div>
}

export default App
