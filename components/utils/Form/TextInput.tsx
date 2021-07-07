import React from "react"

import Input from "./Input"
import {isEmpty} from "../index";

interface iTextInput {
  label?: any
  onChange: (e: any) => void
  placeholder: string
  value: any
  type: string
  error: boolean
  disable: boolean
  name: string
  [id: string]: any
}

const TextInput: React.FC<iTextInput> = ({
  label,
  onChange,
  placeholder,
  value,
  type,
  disable,
  error,
  name,
  ...rest
}) => {
  return (
    <>
      {!isEmpty(label) && <p className="text-sm flex item-center mb-1">{label}</p>}
      <Input
        name={name}
        type={type}
        value={value}
        onChange={(e: any) => {
          if (disable) return
          onChange(e)
        }}
        placeholder={placeholder}
        className={error ? "border-red-600 rounded-full hover:border-red-700" : ""}
        {...rest}
      />
    </>
  )
}

export default TextInput
