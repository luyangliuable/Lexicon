import NavBar from "../../components/Navbar/index";
import Footer from "../../components/Footer/Footer";
import StudioMain from "./studio_main";

export default function index() {
  return (
    <div>
      <NavBar></NavBar>
      <StudioMain></StudioMain>
      <Footer></Footer>
    </div>
  );
}