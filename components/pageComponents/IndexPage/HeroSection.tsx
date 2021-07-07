import React from "react"

import DualPanelSectionWrapper from "../../DualPanelSectionWrapper"

const HeroSection = () => {
  return (
    <>
      <DualPanelSectionWrapper
        imageOnRight={true}
        imageSrc={"homepage/doctor.jpg"}
      >
        <div className="py-12 px-6 sm:px-16  w-full flex items-center border-b">
          <div>
            <div className="flex mb-4 justify-center md:justify-start">
              <p className="px-4 py-2 rounded-full bg-green-600 text-white">
                Welcome to Lexicon
              </p>
            </div>
            <h1 className="text-center md:text-left text-blue-900 font-bold text-5xl mb-6 ">
              Australia's first medical search engine
            </h1>
            <p className="text-center md:text-left text-blue-900 text-lg">
              This platform enables clinicians to take more efficient and
              effective decisions by allowing them a quick and an easy access to
              medical tools and documents.
            </p>
          </div>
        </div>
      </DualPanelSectionWrapper>
    </>
  )
}

export default HeroSection
