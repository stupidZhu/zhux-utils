import { createPortalHelper } from "../../bootstrap"
import MyDialog from "../../component/common/MyDialog/MyDialog"
import styles from "./index.module.scss"

const Dialog = () => {
  return (
    <div className={styles.dialog}>
      <button
        onClick={() => {
          createPortalHelper.add(
            <MyDialog>
              <>123</>
            </MyDialog>
          )
        }}
      >
        new Dialog
      </button>
    </div>
  )
}

export default Dialog
