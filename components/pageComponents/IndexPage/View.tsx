import React from "react"

import HeroSection from "./HeroSection"
import PanelSection from "./PanelSection"
import { iView } from "./types"

const View: React.FC<iView> = ({}) => {
  return (
    <>
      <HeroSection />
      <PanelSection />
    </>
  )
}

export default View
