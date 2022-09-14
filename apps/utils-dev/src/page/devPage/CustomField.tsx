import { Button, Input, InputNumber, message, Switch } from "antd"
import classNames from "classnames"
import { useState } from "react"
import { useCustomFieldsP } from "zhux-utils-react"
import { IKey } from "zhux-utils/dist/type"
import styles from "./index.module.scss"

type FieldItem = { name: string; age?: number; gender?: boolean }

const checkFields = (fields: FieldItem[]) => {
  let flag = true
  for (const i of fields) {
    console.log(i)
    if (!i.name || typeof i.gender === "undefined" || typeof i.age === "undefined") {
      flag = false
      break
    }
  }
  return flag
}

const CustomField = () => {
  const [fields, changeFields] = useCustomFieldsP<FieldItem>({
    templateItem: { name: "", gender: false },
  })
  const [editKey, setEditKey] = useState<IKey>("")

  return (
    <div className={styles.customField}>
      {fields.map((item, index) => {
        return (
          <div className={classNames(styles.fieldItem, { [styles.editing]: editKey === item._key })} key={item._key}>
            <Input
              value={item.name}
              onChange={e => changeFields("edit", { value: { ...item, name: e.target.value }, index })}
            />
            <InputNumber
              value={item.age}
              onChange={e => changeFields("edit", { value: { ...item, age: e }, index })}
              style={{ width: 200 }}
            />
            <Switch checked={item.gender} onChange={e => changeFields("edit", { value: { ...item, gender: e }, index })} />
            <i
              className="iconfont pop-iconedit-fill"
              onClick={() => setEditKey(item._key)}
              style={{ pointerEvents: "auto" }}
            ></i>
            <i className="iconfont pop-iconsave-fill" onClick={() => setEditKey("")}></i>
            <i className="iconfont pop-icondelete-fill" onClick={() => changeFields("del", { index })}></i>
          </div>
        )
      })}
      <Button
        block
        disabled={!!editKey}
        onClick={() => {
          if (!checkFields(fields)) return message.warn("完成上一个")
          const { key } = changeFields("add")
          setEditKey(key)
        }}
      >
        add
      </Button>
    </div>
  )
}

export default CustomField
