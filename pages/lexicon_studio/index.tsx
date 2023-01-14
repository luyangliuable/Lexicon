import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar/index";
import StudioMain from "./studio_main.tsx";

const index = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="xl:min-h-80vh 2xl:min-h-90vh">
                <StudioMain></StudioMain>
            </div>
            {/* <Footer></Footer> */}
            {/* TODO make footer good */}
        </div>
    );
}

export default index;
