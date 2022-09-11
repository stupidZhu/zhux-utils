import React, { useImperativeHandle, useState } from "react"

interface CProps {
  cRef: any
}

const Child: React.FC<CProps> = ({ cRef }) => {
  const [value, onChange] = useState(0)

  useImperativeHandle(cRef, () => ({ value, onChange }))
  return null
}

const P = () => {
  return (
    <>
      123 <Child cRef={console.log} />
    </>
  )
}

export default P
