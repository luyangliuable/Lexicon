import React, { useState } from "react"

interface iForm {
  data: any
  onSubmit: (data: any) => void
  children: (data: any, setData: (key: string, value: any) => void) => any
  onChange?: (data: any) => void
  useDiv?: boolean
}

const Form: React.FC<iForm> = ({
  data,
  onSubmit,
  children,
  onChange,
  useDiv,
}) => {
  const [dataState, setDataState] = useState(data)

  const setData = (key: string, value: any) => {
    setDataState({ ...dataState, [key]: value })
    if (onChange) onChange({ ...dataState, [key]: value })
  }

  const onFormSubmit = (e: any) => {
    onSubmit(dataState)
    e.preventDefault()
  }

  if (useDiv)
    return <div className="p-0 m-0">{children(dataState, setData)}</div>

  return (
    <form className="p-0 m-0" onSubmit={onFormSubmit}>
      {children(dataState, setData)}
    </form>
  )
}

export default Form
