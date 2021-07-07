import NavBar from "../../../components/Navbar/Nav"
import style from "./firstSection.module.css"

export default function HomePageFirstSection() {
  return (
    <div>
      <NavBar></NavBar>
      <div className="h-70vh w-full inline-flex">
        {/* Textul info */}
        <div className="w-1/2 h-full inline-flex">
          <div className="my-auto mx-4">
            <div className="text-blue-900 font-serif xl:text-xl 2xl:text-2xl">
              Australia's first, web based - data driven
            </div>
            <div className="text-blue-900 font-serif xl:text-5xl 2xl:text-6xl my-2.5">
              Medical Repository Platform
            </div>
            <div className="text-blue-900 font-serif xl:text-xl 2xl:text-2xl">
              This platform enables clicians to take more efficient and
              effective decisions by allowing them a quick & an easy access to
              medical tools and documents.
            </div>
          </div>
        </div>
        {/* Picture */}
        <div className="w-1/2 h-full inline-flex" id={style["main-div"]}></div>
      </div>
    </div>
  )
}
