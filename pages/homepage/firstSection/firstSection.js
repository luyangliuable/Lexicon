import style from "./firstSection.module.css";
import NavBar from "../../../components/Navbar/Nav";

export default function HomePageFirstSection() {
    return (
      <div className="w-screen h-screen" id={style["main-div"]}>
        <NavBar></NavBar>
        <div className="h-44 w-3/5 text-5xl px-10 font-serif mt-70vh absolute">
        <span className="text-white bg-black">Australia's first repository platform with enhanced functionalities enabling clinicians to make more efficient and effective decisions.</span>
        </div>
      </div>
    )
  }