import NavBar from "../../components/Navbar/index";
import Footer from "../../components/Footer/Footer";
import EngineSection from "../../components/ParsingEngineComponents/engine_section";

export default function index() {
  return (
    <div>
      <NavBar></NavBar>
      <EngineSection></EngineSection>
      <Footer></Footer>
    </div>
  );
}