import React from "react"

const CircleButton: React.FC<{
  onClick: () => void
  tooltip: string
  Icon: any
  className?: string
  enable: boolean
}> = ({ onClick, Icon, tooltip, className, enable }) => {
  if (!enable) return null
  return (
    <button
      onClick={onClick}
      className={`${className}`}
      title={tooltip}
    >
      {Icon}
    </button>
  )
}

export default CircleButton
