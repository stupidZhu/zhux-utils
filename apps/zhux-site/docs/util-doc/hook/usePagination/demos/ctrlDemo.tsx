/**
 * title: 受控组件
 */
import React, { useState } from "react"
import Pagination from "./Pagination"

const CtrlDemo = () => {
  const [total, setTotal] = useState(500)
  const [value, onChange] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [fastForwardPages, setFastForwardPages] = useState(5)
  const [displayPagesCount, setDisplayPagesCount] = useState(3)
  return (
    <>
      <div className="btn-wrapper column">
        <button onClick={() => setTotal(100)}>改变total为100</button>
        <button onClick={() => onChange(1)}>改变value为1</button>
        <button onClick={() => setPageSize(5)}>改变pageSize为5</button>
        <button onClick={() => setFastForwardPages(3)}>改变fastForwardPages（点击省略号快进快退页数）为3</button>
        <button onClick={() => setDisplayPagesCount(7)}>改变displayPagesCount（省略号中间页数）为7</button>
      </div>
      <hr />
      <Pagination {...{ total, value, onChange, pageSize, fastForwardPages, displayPagesCount }} showSummary />
    </>
  )
}

export default CtrlDemo
