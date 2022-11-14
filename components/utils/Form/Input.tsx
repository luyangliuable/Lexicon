import React from "react"

const Input: React.FC<{ [id: string]: any }> = props => {
  const { className, ...otherProps } = props
  const localClassName = `border p-1 px-3 focus:shadow-outline bg-gray-100 
                          text-blue-900 w-full outline-none hover:border-gray-400`
  return (
    <div>
      <input
        {...otherProps}
        className={`${localClassName} ${className} `}
        style={{
          backgroundImage: "linear-gradient(transparent, transparent)",
          fontFamily: `"Quattrocento Sans", sans-serif`,
        }}
      />
    </div>
  )
}

export default Input
