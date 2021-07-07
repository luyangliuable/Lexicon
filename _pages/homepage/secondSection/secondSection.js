import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function HomePageSecondSection() {
  return (
    <div className="w-screen bg-gray-100 h-70vh relative">
      <div className="table-fixed border-2 border-indigo-800 h-4/5 w-2/3 m-auto flex flex-col absolute top-0 bottom-0 right-0 left-0">
        {/* First Row */}
        <div className="w-full h-1/2 flex flex-row">
          <div className="w-1/2 h-full border-2 border-indigo-800 flex-1 text-5xl text-blue-900 underline text-center font-serif hover:bg-gray-300 focus: cursor-pointer">
            <div className="w-full h-4/5 relative top-20 2xl:top-32">
              Health Information
            </div>
            <div className="w-full h-1/5 flex flex-row-reverse">
              <FontAwesomeIcon
                className="w-1/4 h-full mx-3.5"
                icon={faArrowRight}
              />
            </div>
          </div>
          <div className="w-1/2 h-full border-2 border-indigo-800 flex-1 text-5xl text-blue-900 underline text-center font-serif hover:bg-gray-300 focus: cursor-pointer">
            <div className="w-full h-4/5 relative top-20 xl:top-12 2xl:top-32">
              For Medical Professionals
            </div>
            <div className="w-full h-1/5 flex flex-row-reverse">
              <FontAwesomeIcon
                className="w-1/4 h-full mx-3.5"
                icon={faArrowRight}
              />
            </div>
          </div>
        </div>
        {/* Second Row */}
        <div className="w-full h-1/2 flex flex-row">
          <div className="w-1/2 h-full border-2 border-indigo-800 flex-1 text-5xl text-blue-900 underline text-center font-serif hover:bg-gray-300 focus: cursor-pointer">
            <div className="w-full h-4/5 relative top-20 xl:top-12 2xl:top-24">
              Research Related Information
            </div>
            <div className="w-full h-1/5 flex flex-row-reverse">
              <FontAwesomeIcon
                className="w-1/4 h-full mx-3.5"
                icon={faArrowRight}
              />
            </div>
          </div>
          <div className="w-1/2 h-full border-2 border-indigo-800 flex-1 text-5xl text-blue-900 underline text-center font-serif hover:bg-gray-300 focus: cursor-pointer">
            <div className="w-full h-4/5 relative top-20 2xl:top-32">
              Data Privacy
            </div>
            <div className="w-full h-1/5 flex flex-row-reverse">
              <FontAwesomeIcon
                className="w-1/4 h-full mx-3.5"
                icon={faArrowRight}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
