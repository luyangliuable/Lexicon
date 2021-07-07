import React from "react"

import SiteContainer from "../../../utils/SiteContainer"
import Card from "./Card"

const PanelSection = () => {
  return (
    <SiteContainer className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title="Health Information"
          caption="Fast & easy access to"
          imageSrc="homepage/med-info.jpg"
          bgColor="bg-gray-100"
          textColor="text-blue-900"
        />
        <Card
          title="For Medical Professionals"
          caption="Validated information"
          imageSrc="homepage/doctors.jpg"
          bgColor="bg-gray-100"
          textColor="text-blue-900"
        />
        <Card
          title="Research Related Information"
          caption="A repository for"
          imageSrc="homepage/research.jpg"
          bgColor="bg-gray-100"
          textColor="text-blue-900"
        />
        <Card
          title="Data Privacy"
          caption="We ensure your"
          imageSrc="homepage/data-privacy.jpg"
          bgColor="bg-gray-100"
          textColor="text-blue-900"
        />
      </div>
    </SiteContainer>
  )
}

export default PanelSection
