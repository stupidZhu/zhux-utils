import { useRoutes } from "react-router-dom"
import { routeList } from "../../router"

const RoutePage = () => {
  const element = useRoutes(routeList)
  return element
}

export default RoutePage
