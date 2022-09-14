import { message } from "antd"
import { createBrowserHistory } from "history"
import { RefPromiseHelper, StorageHelper } from "zhux-utils"
import { CreatePortalHelper } from "zhux-utils-react"

message.config({ maxCount: 1 })

// https://reactrouter.com/docs/en/v6/api#unstable_historyrouter
export const myHistory = createBrowserHistory({ window })

export const createPortalHelper = new CreatePortalHelper({ renderType: "portal" })

export const storageHelper = new StorageHelper("UD")

export const refPromiseHelper = new RefPromiseHelper()
