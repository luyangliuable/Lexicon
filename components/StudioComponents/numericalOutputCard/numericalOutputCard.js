import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer } from "react";

function NumericalOutputCard(props) {

    const initialState = { type: props.cardElement.type, name: props.cardElement.name, uuid: props.cardElement.uuid, outputHeading: props.cardElement.outputHeading, previewModeDisplay: props.cardElement.previewModeDisplay, outputDescription: props.cardElement.outputDescription, editMode: props.cardElement.editMode, totalScore: props.cardElement.totalScore };
    const [state, updateNumericalOutputCard] = useReducer(handleNumericalOutputCardChanges, initialState);

    function handleNumericalOutputCardChanges(state, action) {
        switch (action.type) {
            case "HEADING":
                const updatedState_h = { type: state.type, name: state.name, uuid: state.uuid, outputHeading: action.value, previewModeDisplay: state.previewModeDisplay, outputDescription: state.outputDescription, editMode: state.editMode, totalScore: state.totalScore };
                return updatedState_h;
            case "PREVIEW_MODE":
                const updatedState_p = { type: state.type, name: state.name, uuid: state.uuid, outputHeading: state.outputHeading, previewModeDisplay: !state.previewModeDisplay, outputDescription: state.outputDescription, editMode: state.editMode, totalScore: state.totalScore };
                return updatedState_p;
            case "DESCRIPTION":
                const updatedState_d = { type: state.type, name: state.name, uuid: state.uuid, outputHeading: state.outputHeading, previewModeDisplay: state.previewModeDisplay, outputDescription: action.value, editMode: state.editMode, totalScore: state.totalScore };
                return updatedState_d;
            case "EDIT":
                const updatedState_e = { type: state.type, name: state.name, uuid: state.uuid, outputHeading: state.outputHeading, previewModeDisplay: state.previewModeDisplay, outputDescription: state.outputDescription, editMode: !state.editMode, totalScore: state.totalScore };
                return updatedState_e;
        }
    }

    // function for handling the display of the preview button
    function handlePreviewButtonDisplay(state) {
        return state.editMode ?
            (<>
                {state.previewModeDisplay ?
                    (<FontAwesomeIcon icon={faEye} onClick={() => updateNumericalOutputCard({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900" title="Preview mode enabled"></FontAwesomeIcon>) :
                    (<FontAwesomeIcon icon={faEyeSlash} onClick={() => updateNumericalOutputCard({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900" title="Preview mode disabled"></FontAwesomeIcon>)
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
                <div className="w-1/2 text-lg text-blue-900"> {props.elementIndex} | Numerical Output Card</div>
                {/* Edit / Delete Buttons */}
                <div className="w-1/2 flex justify-around">
                    {state.editMode ?
                        (<>
                            <div className="inline-block w-5/12 text-center border-2 my-1 border-transparent rounded"></div>
                            <div className="inline-block w-5/12 text-center border-2 border-blue-900 my-1 rounded hover:bg-blue-900 hover:text-white cursor-pointer" onClick={() => { updateNumericalOutputCard({ type: "EDIT" }), saveChanges(state) }}>Done</div>
                        </>)
                        :
                        (<>
                            <div className="inline-block w-5/12 text-center border-2 border-blue-900 my-1 rounded hover:bg-blue-900 hover:text-white cursor-pointer" onClick={() => updateNumericalOutputCard({ type: "EDIT" })}>Edit</div>
                            <div className="inline-block w-5/12 text-center border-2 border-red-500 my-1 rounded hover:bg-red-500 hover:text-white cursor-pointer" onClick={() => props.deleteMethod(state)}>Delete</div>
                        </>)}
                </div>
                {/* Edit / Delete Buttons */}
            </div>
            {/* card first row */}
            {/* card heading row */}
            <div className="h-9 w-full flex flex-row justify-between">
                <input className={state.editMode ? "h-5/6 w-5/6 px-1 text-blue-900" : "h-5/6 w-5/6 px-1 text-blue-900 cursor-not-allowed"} placeholder="Edit Output Heading ..." readOnly={!state.editMode} value={state.outputHeading} onChange={event => updateNumericalOutputCard({ type: "HEADING", value: event.target.value })} />
                {handlePreviewButtonDisplay(state)}
            </div>
            {/* card heading row */}
            {/* card textarea row */}
            <div className="text-sm text-blue-900 mb-2 mx-1">Add Output Description</div>
            <textarea className={state.editMode ? "h-20 w-full border p-1.5 border-gray-300 rounded" : "h-20 w-full border p-1.5 border-gray-300 rounded cursor-not-allowed"} placeholder="Output Description ..." readOnly={!state.editMode} value={state.outputDescription} onChange={event => updateNumericalOutputCard({ type: "DESCRIPTION", value: event.target.value })}></textarea>
            {/* card textarea row */}
        </div>
    </>)
}

export default NumericalOutputCard;