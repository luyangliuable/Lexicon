import { faEllipsisV, faEye, faFileExport, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function studioMain() {
    return (<div className="w-100vw h-100vh">
        {/* studio navbar */}
        <div className="w-screen p-1 flex justify-between items-center">
            <div className="text-3xl text-blue-900 m-1 inline-block font-semibold">Lexicon Studio</div>
            <div className="flex items-center">
                <div className="text-blue-900 text-lg mr-2 px-1.5 py-1 cursor-pointer border-b-2 border-transparent hover:border-blue-900">
                    <FontAwesomeIcon icon={faPlusCircle} className="mr-1.5" />Create
                </div>
                <div className="text-blue-900 text-lg mr-2 px-1.5 py-1 cursor-pointer border-b-2 border-transparent hover:border-blue-900">
                    <FontAwesomeIcon icon={faEye} className="mr-1.5" />Preview
                </div>
                <div className="text-blue-900 text-lg mr-2 px-1.5 py-1 cursor-pointer border-b-2 border-transparent hover:border-blue-900">
                    <FontAwesomeIcon icon={faFileExport} className="mr-1.5" />Export to JSON
                </div>
            </div>
        </div>
        {/* studio navbar */}
        {/* card display section */}
        <div className="flex">
            <div className="w-1/3 mx-2 shadow-md border px-2 rounded-md text-blue-900 text-lg h-9 pt-1">
                <FontAwesomeIcon icon={faEllipsisV} className="mr-2" />Meta
            </div>
            <div className="w-1/3 mx-2 shadow-md border px-2 rounded-md text-blue-900 text-lg h-9 pt-1">
                <FontAwesomeIcon icon={faEllipsisV} className="mr-2" />Inputs
            </div>
            <div className="w-1/3 mx-2 shadow-md border px-2 rounded-md text-blue-900 text-lg h-9 pt-1">
                <FontAwesomeIcon icon={faEllipsisV} className="mr-2" />Outputs
            </div>
        </div>
        {/* card display section */}
    </div>)
}

export default studioMain;