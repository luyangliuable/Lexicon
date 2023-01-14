import NavBar from "../../components/Navbar/index";
import Footer from "../../components/Footer/Footer";
import EngineSection from "../../components/ParsingEngineComponents/engine_section.tsx";
import {useEffect} from 'react';

type iProps = {}

const Index = (props: iProps): React.FC => {

    useEffect(() => {
        document.getElementsByClassName("navbar-option")[0].style.background = "#00bfff";
        document.getElementsByClassName("navbar-option")[0].style.color = "#FFF";
    })

    return (
        <div>
            <NavBar></NavBar>
            <EngineSection />
            {/* <Footer></Footer> */}
        </div>
    );
}

export default Index
