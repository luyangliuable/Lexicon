import { faEye, faEyeSlash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer, useState } from "react";

function ReferenceCard(props) {

    const [referenceName, referenceNameUpdate] = useState("");
    const [URLlinkName, URLlinkNameUpdate] = useState("");
    const [previewModeDisplay, updatePreviewModeDisplay] = useState(true);
    const initialState = { referenceName: '', url_link: '', previewModeDisplay: true };
    const [state, updateReferenceCard] = useReducer(handleReferenceCardChanges, initialState);

    function handleReferenceCardChanges(state, action) {
        switch (action.type) {
            case "REFERENCE_NAME":
                const updatedState_r = { referenceName: action.value, url_link: state.url_link, previewModeDisplay: state.previewModeDisplay };
                return updatedState_r;
            case "URL_LINK":
                const updatedState_l = { referenceName: state.referenceName, url_link: action.value, previewModeDisplay: state.previewModeDisplay };
                return updatedState_l;
            case "PREVIEW_MODE":
                const updatedState_p = { referenceName: state.referenceName, url_link: state.url_link, previewModeDisplay: !state.previewModeDisplay };
                return updatedState_p;
        }
    }

    return (<>
        <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* card first row */}
            <div className="flex flex-row h-9 my-2">
                <div className="w-2/3 text-lg text-blue-900"> {props.elementIndex} | Reference Card</div>
                <div className="w-1/3 bg-red-500 hover:bg-red-400 text-white flex justify-around cursor-pointer text-center p-1.5 rounded">
                    <div><FontAwesomeIcon icon={faTrashAlt} className="mx-2"></FontAwesomeIcon>Delete</div>
                </div>
            </div>
            {/* card first row */}
            {/* card heading row */}
            <div className="h-9 w-full flex flex-row justify-between">
                <input className="h-5/6 w-5/6 px-1 text-blue-900" value={state.referenceName} placeholder="Edit Reference Name ..." onChange={event => updateReferenceCard({ type: "REFERENCE_NAME", value: event.target.value })} />
                {previewModeDisplay ?
                    (<FontAwesomeIcon icon={faEye} onClick={() => updateReferenceCard({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900"></FontAwesomeIcon>) :
                    (<FontAwesomeIcon icon={faEyeSlash} onClick={() => updateReferenceCard({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900"></FontAwesomeIcon>)}
            </div>
            {/* card heading row */}
            {/* card textarea row */}
            <input className="h-10 w-full border p-1.5 border-gray-300 rounded" value={state.url_link} placeholder="Enter URL / Link ..." onChange={event => updateReferenceCard({ type: "URL_LINK", value: event.target.value })} />
            {/* card textarea row */}
        </div>
    </>)
}

export default ReferenceCard;