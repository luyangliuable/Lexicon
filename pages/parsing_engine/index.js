import NavBar from "../../components/Navbar/index";
import Footer from "../../components/Footer/Footer";
import EngineSection from "../../components/ParsingEngineComponents/engine_section";
import {useEffect} from 'react';

export default function index() {
    useEffect(() => {
        document.getElementsByClassName("navbar-option")[0].style.background = "#00bfff";
        document.getElementsByClassName("navbar-option")[0].style.color = "#FFF";
    });

    return (
            <div>
            <NavBar></NavBar>
            <EngineSection></EngineSection>
            <Footer></Footer>
            </div>
    );
}
