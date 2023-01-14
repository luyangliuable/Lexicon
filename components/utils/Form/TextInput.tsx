import React from "react"

import { isEmpty } from "../index"
import Input from "./Input"

interface iTextInput {
    label?: any
    onChange: (e: any) => void
    placeholder: string
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
    className,
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
                onChange={(e: any) => {
                    onChange(e)
                }}
                placeholder={placeholder}
                className={` ${rounded && "rounded-full border-6 border-blue-900"} ${className} ${error && "border-red-600 hover:border-red-700"}`}
                {...rest}
            />
        </>
    )
}

export default TextInput
