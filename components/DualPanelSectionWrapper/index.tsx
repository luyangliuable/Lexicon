import React from "react"

interface iDualPanelSectionWrapper {
  imageOnRight: boolean
  children: any
  imageSrc: any
  alt?: string
}

const DualPanelSectionWrapper: React.FC<iDualPanelSectionWrapper> = ({
  imageOnRight,
  imageSrc,
  children,
  alt,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {imageOnRight && (
        <div
          className="hidden sm:block md:hidden w-full h-full bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${imageSrc})`,
            height: "500px",
          }}
        />
      )}
      {imageOnRight && (
        <div
          className="block sm:hidden w-full h-full bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${imageSrc})`,
            height: "300px",
          }}
        />
      )}
      {!imageOnRight && (
        <div
          className="w-full h-full bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${imageSrc})`,
            minHeight: "400px",
          }}
        />
      )}
      <div className="w-full h-full inline-flex">{children}</div>
      {imageOnRight && (
        <div
          className="hidden md:block w-full h-full bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${imageSrc})`,
            minHeight: "400px",
          }}
        />
      )}
    </div>
  )
}

export default DualPanelSectionWrapper
