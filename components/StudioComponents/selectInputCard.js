import { faEye, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NumericalInputCard() {
    return (<>
        <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* card first row */}
            <div className="flex flex-row h-9 my-2">
                <div className="w-2/3 text-lg text-blue-900"> 0 | Select Input Card</div>
                <div className="w-1/3 bg-red-500 hover:bg-red-400 text-white flex justify-around cursor-pointer text-center p-1.5 rounded mr-1">
                    <div><FontAwesomeIcon icon={faTrashAlt} className="mx-2"></FontAwesomeIcon>Delete</div>
                </div>
            </div>
            {/* card first row */}
            {/* card heading row */}
            <div className="h-9 w-full flex flex-row justify-between">
                <input className="h-5/6 w-5/6 px-1 text-blue-900" placeholder="Edit Question Text ..." />
                <FontAwesomeIcon icon={faEye} className="text-xl my-1 cursor-pointer text-blue-900 mr-1"></FontAwesomeIcon>
            </div>
            {/* card heading row */}
            <div className="">
                <div className="text-blue-900 text-sm p-1">Add Options</div>
                {/*input row section */}
                <div className="w-full p-1">
                    <div className="w-full h-10 mb-1 bg-blue-100 border rounded flex justify-between flex-row">
                        <input className="bg-blue-100 px-2 w-2/3" placeholder="Edit Option ..." />
                        <div className="flex flex-row justify-around py-0.5">
                            <div className="h-full w-9 text-center pt-1 border rounded bg-blue-600 text-white">0</div>
                            <div className="h-full w-9 text-center pt-1 border rounded bg-red-600 text-white mx-2 hover:bg-red-500 cursor-pointer"><FontAwesomeIcon icon={faTrashAlt} className=""></FontAwesomeIcon></div>
                        </div>
                    </div>
                </div>
                {/* input row section */}
                <div className=" flex flex-row justify-between mb-1.5">
                    <div className="w-1/5 h-9 ml-1.5">
                        <div className="text-blue-900 text-xs">Max Selections</div>
                        <input className="text-sm border rounded px-1 w-20 border-opacity-50" type="number" placeholder="1"/>
                    </div>
                    <div className="bg-blue-500 w-1/5 h-9 text-center pt-1.5 text-white cursor-pointer hover:bg-blue-600 rounded mr-1">
                        <FontAwesomeIcon icon={faPlus} className=""></FontAwesomeIcon> Select Item
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default NumericalInputCard;