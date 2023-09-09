import { Button, Input, InputNumber, Switch } from "antd"
import classNames from "classnames"
import { useState } from "react"
import { useCustomFields } from "zhux-utils-react"
import { IKey } from "zhux-utils/dist/type"
import styles from "./index.module.scss"

type FieldItem = { id: string; name: string; age?: number; gender?: boolean }

const CustomField = () => {
  const [editKey, setEditKey] = useState<IKey>("")
  const { fields, addField, editField, delField, validate } = useCustomFields<FieldItem>({
    templateItem: { name: "" },
    validateItem(item) {
      return !!item.name
    },
    onAction(info) {
      console.log(info)
      const { field, type, flag, message } = info
      if ((!flag || type === "add") && field?.id) setEditKey(field.id)
      if (!flag && message) alert(message)
    },
  })

  return (
    <div className={styles.customField}>
      <Button size="small" type="primary" block disabled={!!editKey} onClick={() => addField(undefined, "unshift")}>
        add - unshift
      </Button>
      {fields.map(item => {
        return (
          <div className={classNames(styles.fieldItem, { [styles.editing]: editKey === item.id })} key={item.id}>
            <Input value={item.name} onChange={e => editField({ ...item, name: e.target.value })} />
            <InputNumber value={item.age} onChange={e => editField({ ...item, age: e! })} style={{ width: 200 }} />
            <Switch checked={item.gender} onChange={e => editField({ ...item, gender: e })} />
            {editKey === item.id ? (
              <i
                className="iconfont pop-iconsave-fill"
                onClick={() => {
                  setEditKey("")
                  validate([item])
                }}
              />
            ) : (
              <>
                <i
                  className="iconfont pop-iconedit-fill"
                  onClick={() => {
                    setEditKey(item.id)
                    validate(undefined, [item])
                  }}
                />
                <i className="iconfont pop-icondelete-fill" onClick={() => delField(item)} />
              </>
            )}
          </div>
        )
      })}
      <Button size="small" type="primary" block disabled={!!editKey} onClick={() => addField()}>
        add - push
      </Button>
      <Button
        size="small"
        type="primary"
        block
        disabled={!!editKey}
        onClick={() => {
          addField({ name: "hello" })
          addField({ name: "world" })
          addField({ name: "zhux" })
        }}
      >
        test
      </Button>
      <Button size="small" type="primary" block disabled={!!editKey} onClick={() => console.log(fields)}>
        log
      </Button>
    </div>
  )
}

export default CustomField
