import classNames from "classnames"
import React, { useEffect } from "react"
import { useCtrlComponent, usePagination } from "zhux-utils-react"
import { UsePaginationProps } from "zhux-utils-react/dist/hook/usePagination/usePagination"
import { ClassStyle } from "zhux-utils-react/dist/type"
import "./index.scss"

interface Props extends UsePaginationProps, ClassStyle {
  showSummary?: boolean
}

const Pagination: React.FC<Props> = props => {
  const { showSummary, className, style, ...rest } = props
  const [curPage, setCurPage] = useCtrlComponent(rest)
  const { pageList, itemClick, utils } = usePagination({ value: curPage, onChange: setCurPage, ...rest })

  useEffect(() => {
    setCurPage(utils.calcPage(curPage))
  }, [rest.total])

  return (
    <div className={classNames("pagination", className)} style={style}>
      {showSummary && <div className="summary">共{utils.summary.total}条</div>}
      <div className="page-list">
        {pageList.map((item, index) => {
          if (["ellipsis-prev", "ellipsis-next"].includes(item.type)) {
            return (
              <button key={index} className="page-item" onClick={() => itemClick(item)}>
                ...
              </button>
            )
          }
          if (["prev", "next"].includes(item.type)) {
            return (
              <button key={index} className="turn-page-btn" onClick={() => itemClick(item)}>
                {item.type === "prev" ? <span>&lt;</span> : <span>&gt;</span>}
              </button>
            )
          }
          return (
            <button key={index} onClick={() => itemClick(item)} className={classNames("page-item", { active: item.active })}>
              {item.page}
            </button>
          )
        })}
      </div>
      <div className="jump-to">
        跳至&nbsp;
        <input
          type="number"
          onKeyDown={e => {
            if (e.key === "Enter") {
              const val = Number.parseInt((e.target as any).value)
              setCurPage(utils.calcPage(val))
            }
          }}
        />
        &nbsp; 页
      </div>
    </div>
  )
}

export default Pagination
