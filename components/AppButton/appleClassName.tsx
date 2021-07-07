import React from "react"

import { iAppButton } from "./types"

const applyClassName = (
  Button: React.FC<iAppButton>,
  classNameToApply: string
) => {
  return ({ className, ...rest }: iAppButton) => (
    <Button className={`${className} ${classNameToApply}`} {...rest} />
  )
}

export default applyClassName
