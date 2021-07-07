import Link from "next/link"

import Footer from "../../components/Footer/Footer"
import NavBar from "../../components/Navbar/Nav"
import EngineSection from "../test/engine_section/engine_section"

export default function index() {
  return (
    <div>
      <NavBar></NavBar>
      <EngineSection></EngineSection>
      <Footer></Footer>
    </div>
  )
}
