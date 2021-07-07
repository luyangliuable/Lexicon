import React from "react"

const SiteContainer: React.FC<{ children: any; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={`${className} px-4 sm:px-6 md:px-8 lg:px-16`}>
      {children}
    </div>
  )
}

export default SiteContainer
