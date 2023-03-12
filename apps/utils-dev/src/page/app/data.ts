import React from "react"
import { IOption } from "zhux-utils/dist/type"
import CustomField from "../devPage/CustomField"
import Dialog from "../devPage/Dialog"
import Memo from "../devPage/Memo"
import StorageHelper from "../devPage/StorageHelper"
import TestTree from "../devPage/TestTree"

const routerOptions: Array<IOption<string, string> & { com: React.FC }> = [
  { label: "Dialog", value: "Dialog", com: Dialog },
  { label: "CustomField", value: "CustomField", com: CustomField },
  { label: "Memo", value: "Memo", com: Memo },
  { label: "StorageHelper", value: "StorageHelper", com: StorageHelper },
  { label: "TestTree", value: "TestTree", com: TestTree },
]

export default routerOptions
