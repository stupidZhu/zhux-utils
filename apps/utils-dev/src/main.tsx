import "antd/dist/antd.css"
import ReactDOM from "react-dom/client"
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"
import { ConfigProvider as ZhuxUtilConfigProvider } from "zhux-utils-react"
import { createPortalHelper, myHistory } from "./bootstrap"
import RoutePage from "./page/utilPage/RoutePage"
import "./style/common.scss"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HistoryRouter history={myHistory}>
    <ZhuxUtilConfigProvider>
      <createPortalHelper.PortalRoot />
      <RoutePage />
    </ZhuxUtilConfigProvider>
  </HistoryRouter>
)
