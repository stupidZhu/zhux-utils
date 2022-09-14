import React from "react"
import { IOption } from "zhux-utils/dist/type"
import CustomField from "../devPage/CustomField"
import Dialog from "../devPage/Dialog"

const routerOptions: Array<IOption<string, string> & { com: React.FC }> = [
  { label: "Dialog", value: "Dialog", com: Dialog },
  { label: "CustomField", value: "CustomField", com: CustomField },
]

export default routerOptions
