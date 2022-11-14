import React from "react"

interface iCard {
  title: string
  caption: string
  imageSrc: string
  bgColor: string
  textColor: string
}

const Card: React.FC<iCard> = ({
  title,
  caption,
  imageSrc,
  bgColor,
  textColor,
}) => {
  return (
    <div className="site-border-radius overflow-hidden grid grid-cols-1 xl:grid-cols-2">
      <div
        className="w-full h-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${imageSrc})`,
          height: "250px",
        }}
      />
      <div className={`${bgColor} px-6 pt-8 pb-12 md:pb-8 ${textColor} h-full flex items-center`}>
        <div className="w-full">
          <p className="text-lg md:text-left text-center">{caption}</p>
          <h1 className="text-4xl font-bold md:text-left text-center">{title}</h1>
        </div>
      </div>
    </div>
  )
}

export default Card
