import { faEye, faEyeSlash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function BivalentInputCardPreviewMode(props) {

    function responseButtonStyling(response, callingButton) {
        const notSelected = "inline-block w-5/12 text-center text-white bg-blue-900 pt-0.5 cursor-pointer text-xl hover:shadow-xl border border-transparent hover:bg-blue-600 rounded";
        const selected = "inline-block w-5/12 text-center text-white bg-blue-600 pt-0.5 cursor-pointer text-xl hover:shadow-xl border border-transparent hover:bg-blue-600 rounded";
        switch (callingButton) {
            case 'YES':
                switch (response) {
                    case null:
                        return notSelected;
                    case true:
                        return selected;
                    case false:
                        return notSelected;
                }
            case 'NO':
                switch (response) {
                    case null:
                        return notSelected;
                    case true:
                        return notSelected;
                    case false:
                        return selected;
                }
        }
    }

    function noButtonStyling(response) {

    }

    const [response, recordResponse] = useState(null);

    return (<>
        <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* question row */}
            <div className="inline-block font-semibold text-xl w-full text-blue-900 break-all">
                {props.cardElement.questionText}
            </div>
            {/* question row */}
            {/* response row */}
            <div className="w-full flex justify-around h-8 my-2.5">
                <div className={responseButtonStyling(response, 'YES')}
                    onClick={() => recordResponse(true)}> Yes </div>
                <div className={responseButtonStyling(response, 'NO')}
                    onClick={() => recordResponse(false)}> No </div>
            </div>
            {/* response row */}
        </div>
    </>);
}

export default BivalentInputCardPreviewMode;