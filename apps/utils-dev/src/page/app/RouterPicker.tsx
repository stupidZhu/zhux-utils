import { Select } from "antd"
import { useNavigate } from "react-router-dom"
import routerOptions from "../../router/data"

const RouterPicker = () => {
  const navigate = useNavigate()
  return <Select options={routerOptions} style={{ width: "100%" }} onChange={e => navigate(e)} />
}

export default RouterPicker
