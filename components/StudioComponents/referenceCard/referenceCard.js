import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer } from "react";

function ReferenceCard(props) {

    const initialState = { type: props.cardElement.type, name: props.cardElement.name, uuid: props.cardElement.uuid, referenceName: props.cardElement.referenceName, url_link: props.cardElement.url_link, previewModeDisplay: props.cardElement.previewModeDisplay, editMode: props.cardElement.editMode };
    const [state, updateReferenceCard] = useReducer(handleReferenceCardChanges, initialState);

    function handleReferenceCardChanges(state, action) {
        switch (action.type) {
            case "REFERENCE_NAME":
                const updatedState_r = { type: state.type, name: state.name, uuid: state.uuid, referenceName: action.value, url_link: state.url_link, previewModeDisplay: state.previewModeDisplay, editMode: state.editMode };
                return updatedState_r;
            case "URL_LINK":
                const updatedState_l = { type: state.type, name: state.name, uuid: state.uuid, referenceName: state.referenceName, url_link: action.value, previewModeDisplay: state.previewModeDisplay, editMode: state.editMode };
                return updatedState_l;
            case "PREVIEW_MODE":
                const updatedState_p = { type: state.type, name: state.name, uuid: state.uuid, referenceName: state.referenceName, url_link: state.url_link, previewModeDisplay: !state.previewModeDisplay, editMode: state.editMode };
                return updatedState_p;
            case "EDIT":
                const updatedState_e = { type: state.type, name: state.name, uuid: state.uuid, referenceName: state.referenceName, url_link: state.url_link, previewModeDisplay: state.previewModeDisplay, editMode: !state.editMode };
                return updatedState_e;
        }
    }

    // function for handling the display of the preview button
    function handlePreviewButtonDisplay(state) {
        return state.editMode ?
            (<>
                {state.previewModeDisplay ?
                    (<FontAwesomeIcon icon={faEye} onClick={() => updateReferenceCard({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900" title="Preview mode enabled"></FontAwesomeIcon>) :
                    (<FontAwesomeIcon icon={faEyeSlash} onClick={() => updateReferenceCard({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900" title="Preview mode disabled"></FontAwesomeIcon>)
                }
            </>)
            :
            (<>
                {state.previewModeDisplay ?
                    (<FontAwesomeIcon icon={faEye} className="text-xl my-1 cursor-pointer text-blue-900 cursor-not-allowed"></FontAwesomeIcon>) :
                    (<FontAwesomeIcon icon={faEyeSlash} className="text-xl my-1 cursor-pointer text-blue-900 cursor-not-allowed"></FontAwesomeIcon>)
                }
            </>)
    }

    // function for sending the changes of the reference card to the parent component
    function saveChanges(state) {
        props.stateChangeMethod(state);
    }

    return (<>
        <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* card first row */}
            <div className="flex flex-row h-9 my-2">
                <div className="w-1/2 text-lg text-blue-900"> {props.elementIndex} | Reference Card</div>
                {/* <div className="w-1/2 bg-red-500 hover:bg-red-400 text-white flex justify-around cursor-pointer text-center p-1.5 rounded">
                    <div><FontAwesomeIcon icon={faTrashAlt} className="mx-2"></FontAwesomeIcon>Delete</div>
                </div> */}
                {/* Edit / Delete Buttons */}
                <div className="w-1/2 flex justify-around">
                    {state.editMode ?
                        (<>
                            <div className="inline-block w-5/12 text-center border-2 my-1 border-transparent rounded"></div>
                            <div className="inline-block w-5/12 text-center border-2 border-blue-900 my-1 rounded hover:bg-blue-900 hover:text-white cursor-pointer" onClick={() => { updateReferenceCard({ type: "EDIT" }); saveChanges(state) }}>Done</div>
                        </>)
                        :
                        (<>
                            <div className="inline-block w-5/12 text-center border-2 border-blue-900 my-1 rounded hover:bg-blue-900 hover:text-white cursor-pointer" onClick={() => updateReferenceCard({ type: "EDIT" })}>Edit</div>
                            <div className="inline-block w-5/12 text-center border-2 border-red-500 my-1 rounded hover:bg-red-500 hover:text-white cursor-pointer" onClick={() => props.deleteMethod(state)}>Delete</div>
                        </>)}
                </div>
                {/* Edit / Delete Buttons */}
            </div>
            {/* card first row */}
            {/* card heading row */}
            <div className="h-9 w-full flex flex-row justify-between">
                <input className={state.editMode ? "h-5/6 w-5/6 px-1 text-blue-900" : "h-5/6 w-5/6 px-1 text-blue-900 cursor-not-allowed"} readOnly={!state.editMode} value={state.referenceName} placeholder="Edit Reference Name ..." onChange={event => updateReferenceCard({ type: "REFERENCE_NAME", value: event.target.value })} />
                {/* {state.previewModeDisplay ?
                    (<FontAwesomeIcon icon={faEye} onClick={() => updateReferenceCard({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900"></FontAwesomeIcon>) :
                    (<FontAwesomeIcon icon={faEyeSlash} onClick={() => updateReferenceCard({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900"></FontAwesomeIcon>)} */}
                {handlePreviewButtonDisplay(state)}
            </div>
            {/* card heading row */}
            {/* card textarea row */}
            <input className={state.editMode ? "h-10 w-full border p-1.5 border-gray-300 rounded" : "h-10 w-full border p-1.5 border-gray-300 rounded cursor-not-allowed"} readOnly={!state.editMode} value={state.url_link} placeholder="Enter URL / Link ..." onChange={event => updateReferenceCard({ type: "URL_LINK", value: event.target.value })} />
            {/* card textarea row */}
        </div>
    </>)
}

export default ReferenceCard;