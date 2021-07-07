import React from "react"

import { iAppButton } from "./types"

const AppButton: React.FC<iAppButton> = ({
  title,
  onClick,
  Icon,
  iconOnRight,
  tooltip,
  className,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      title={tooltip || title}
      className={`flex items-center leading-none pl-4 pr-4 py-2 transition duration-100 ease-in ${className}`}
      {...rest}
    >
      {!iconOnRight && Icon}
      {!iconOnRight && Boolean(Icon) && title && <span className="mx-1" />}
      <span>{title}</span>
      {iconOnRight && Boolean(Icon) && title && <span className="mx-1" />}
      {iconOnRight && Icon}
    </button>
  )
}

export default AppButton
