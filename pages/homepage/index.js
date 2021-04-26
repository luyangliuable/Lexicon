import NavBar from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import style from "./Homepage.module.css";

export default function HomePage() {
  return (
    <div>

      <NavBar></NavBar>

      <div className="jumbotron mt-28 mx-auto w-2/4 border-2 border-solid border-black relative">
        <h1 className="display-4">Lexicon</h1>
        <p className="lead">
        Australia's first repository platform with enhanced functionalities enabling clinicians to make more efficient and effective decisions.
        </p>
        <hr className="my-4" />
        <p>This tool utilizes advanced search functionalities with a complex search engine that makes searching for different other tools and documents easy and time efficient.</p>
        <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
      </div>

      <Footer></Footer>
    </div>
  )
}