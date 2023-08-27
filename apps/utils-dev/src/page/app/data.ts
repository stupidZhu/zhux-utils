import React from "react"
import ClearEmptyVal from "../devPage/ClearEmptyVal"
import CtrlComponent from "../devPage/CtrlComponent"
import CustomField from "../devPage/CustomField"
import Dialog from "../devPage/Dialog"
import Memo from "../devPage/Memo"
import StorageHelper from "../devPage/StorageHelper"
import TestTree from "../devPage/TestTree"

const routerOptions: Array<{ value: string; com: React.FC }> = [
  { value: "Dialog", com: Dialog },
  { value: "CustomField", com: CustomField },
  { value: "Memo", com: Memo },
  { value: "StorageHelper", com: StorageHelper },
  { value: "TestTree", com: TestTree },
  { value: "CtrlComponent", com: CtrlComponent },
  { value: "ClearEmptyVal", com: ClearEmptyVal },
]

export default routerOptions
