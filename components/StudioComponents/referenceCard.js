import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ReferenceCard() {
    return (<>
        <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* card first row */}
            <div className="flex flex-row h-9 my-2">
                <div className="w-2/3 text-lg text-blue-900"> 0 | Reference Card</div>
                <div className="w-1/3 bg-red-500 hover:bg-red-400 text-white flex justify-around cursor-pointer text-center p-1.5 rounded">
                    <div><FontAwesomeIcon icon={faTrashAlt} className="mx-2"></FontAwesomeIcon>Delete</div>
                </div>
            </div>
            {/* card first row */}
            {/* card heading row */}
            <div className="h-9 w-full flex flex-row justify-between">
                <input className="h-5/6 w-5/6 px-1 text-blue-900" placeholder="Edit Reference Name ..." />
                <FontAwesomeIcon icon={faEye} className="text-xl my-1 cursor-pointer text-blue-900"></FontAwesomeIcon>
            </div>
            {/* card heading row */}
            {/* card textarea row */}
            <input className="h-10 w-full border p-1.5 border-gray-300 rounded" placeholder="Enter URL / Link ..." />
            {/* card textarea row */}
        </div>
    </>)
}

export default ReferenceCard;