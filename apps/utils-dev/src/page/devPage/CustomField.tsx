import { Button, Input, InputNumber, message, Switch } from "antd"
import classNames from "classnames"
import { useState } from "react"
import { useCustomFields } from "zhux-utils-react"
import { IKey } from "zhux-utils/dist/type"
import styles from "./index.module.scss"

type FieldItem = { name: string; age?: number; gender?: boolean }

const checkFields = (fields: FieldItem[]) => {
  let flag = true
  for (const i of fields) {
    if (!i.name || typeof i.gender === "undefined" || typeof i.age === "undefined") {
      flag = false
      break
    }
  }
  return flag
}

const CustomField = () => {
  const [fields, changeFields] = useCustomFields<FieldItem>({
    templateItem: { name: "", gender: false },
  })
  const [editKey, setEditKey] = useState<IKey>("")

  return (
    <div className={styles.customField}>
      {fields.map(item => {
        return (
          <div className={classNames(styles.fieldItem, { [styles.editing]: editKey === item._key })} key={item._key}>
            <Input value={item.name} onChange={e => changeFields("edit", { ...item, name: e.target.value })} />
            <InputNumber value={item.age} onChange={e => changeFields("edit", { ...item, age: e })} style={{ width: 200 }} />
            <Switch checked={item.gender} onChange={e => changeFields("edit", { ...item, gender: e })} />
            <i
              className="iconfont pop-iconedit-fill"
              onClick={() => setEditKey(item._key)}
              style={{ pointerEvents: "auto" }}
            ></i>
            <i className="iconfont pop-iconsave-fill" onClick={() => setEditKey("")}></i>
            <i className="iconfont pop-icondelete-fill" onClick={() => changeFields("del", item)}></i>
          </div>
        )
      })}
      <Button
        block
        disabled={!!editKey}
        onClick={() => {
          if (!checkFields(fields)) return message.warn("完成上一个")
          const key = changeFields("add")
          setEditKey(key!)
        }}
      >
        add
      </Button>
    </div>
  )
}

export default CustomField
