import React from "react"

import { isEmpty } from "../index"
import Input from "./Input"

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
  rounded: boolean
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
  rounded,
  ...rest
}) => {
  return (
    <>
      {!isEmpty(label) && (
        <p className="text-sm flex item-center mb-1">{label}</p>
      )}
      <Input
        name={name}
        type={type}
        value={value}
        onChange={(e: any) => {
          if (disable) return
          onChange(e)
        }}
        placeholder={placeholder}
        className={` ${rounded && "rounded-full border-6 border-blue-900"}  ${
          error && "border-red-600 hover:border-red-700"
        }`}
        {...rest}
      />
    </>
  )
}

export default TextInput
