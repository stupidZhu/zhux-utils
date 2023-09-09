import React from "react"
import ClearEmptyVal from "../page/devPage/ClearEmptyVal"
import CtrlComponent from "../page/devPage/CtrlComponent"
import CustomFieldV2 from "../page/devPage/CustomFieldV2"
import Dialog from "../page/devPage/Dialog"
import Memo from "../page/devPage/Memo"
import StorageHelper from "../page/devPage/StorageHelper"
import TestTree from "../page/devPage/TestTree"

const routerOptions: Array<{ value: string; com: React.FC }> = [
  { value: "Dialog", com: Dialog },
  { value: "CustomFieldV2", com: CustomFieldV2 },
  { value: "Memo", com: Memo },
  { value: "StorageHelper", com: StorageHelper },
  { value: "TestTree", com: TestTree },
  { value: "CtrlComponent", com: CtrlComponent },
  { value: "ClearEmptyVal", com: ClearEmptyVal },
]

export default routerOptions
