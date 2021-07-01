import Link from "next/link";
import NavBar from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import EngineSection from "../test/engine_section/engine_section";

export default function index() {
  return (
    <div>
      <NavBar></NavBar>
      <EngineSection></EngineSection>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer></Footer>
      </div>
    </div>
  );
}
