import { Outlet } from "react-router-dom"
import styles from "./index.module.scss"
import RouterPicker from "./RouterPicker"

const App = () => {
  return (
    <div className={styles.app}>
      <RouterPicker />
      <hr />
      <Outlet />
    </div>
  )
}

export default App
