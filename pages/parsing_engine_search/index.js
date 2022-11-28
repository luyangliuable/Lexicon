import NavBar from "../../components/Navbar/index";
import Footer from "../../components/Footer/Footer";
import SearchSection from "../../components/ParsingEngineComponents/search_section";

export default function index() {
    return (
            <div>
            <NavBar></NavBar>
            <SearchSection></SearchSection>
            <Footer></Footer>
            </div>
    );
}
