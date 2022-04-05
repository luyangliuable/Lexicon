import React from "react"

import HeroSection from "./HeroSection"
import PanelSection from "./PanelSection"
import WhyUseLexiconSection from "./WhyUseLexiconSection";
import Footer from "./Footer/index";
import { iView } from "./types"

const View: React.FC<iView> = ({ }) => {
  return (
    <>
      <HeroSection />
      <PanelSection />
      <WhyUseLexiconSection />
      <Footer />
    </>
  )
}

export default View
