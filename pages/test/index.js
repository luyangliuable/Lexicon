import Link from "next/link";
import NavBar from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import EngineSection from "../test/engine_section/engine_section";

export default function index() {
  return (
    <div>
      <NavBar></NavBar>
      <EngineSection></EngineSection>
      <Footer></Footer>
    </div>
  );
}
