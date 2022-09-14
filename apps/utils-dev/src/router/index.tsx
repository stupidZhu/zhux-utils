import { RouteObject } from "react-router-dom"
import App from "../page/app/App"
import routerOptions from "../page/app/data"

export const routeList: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: routerOptions.map(item => ({ path: item.value, element: <item.com /> })),
  },
]
