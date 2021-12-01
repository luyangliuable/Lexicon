import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer } from "react";

function NumericalOutputCardPreviewMode(props){
    return (<>
        <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* card heading row */}
            <div className="flex flex-row my-1 mb-0">
                <div className="inline-block font-black text-2xl w-full text-blue-900 break-all">{props.cardElement.outputHeading}</div>
            </div>
            {/* card heading row */}
            {/* card content area */}
            <div className="mb-1 break-all">{props.cardElement.outputDescription}</div>
            {/* card content area */}
        </div>
    </>)
}

export default NumericalOutputCardPreviewMode;