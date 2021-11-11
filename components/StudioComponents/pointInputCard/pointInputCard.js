import { faEye, faEyeSlash, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer, useState } from "react";
import OptionElement from "./optionElement";
import { v4 as uuidv4 } from 'uuid';

function PointInputCard(props) {

    const initialState = { type: props.cardElement.type, name: props.cardElement.name, uuid: props.cardElement.uuid, questionText: props.cardElement.questionText, previewModeDisplay: props.cardElement.previewModeDisplay, optionsObject: props.cardElement.optionsObject, editMode: props.cardElement.editMode };
    const [state, updateOptionsObject] = useReducer(handleoptionsObjectChanges, initialState);

    // function for handling the changes in the options array
    function handleoptionsObjectChanges(state, action) {
        const optionElementUUID = action.value;
        switch (action.type) {
            case "QUESTION_TEXT":
                const updatedState_question_text = { type: state.type, name: state.name, uuid: state.uuid, questionText: action.value, previewModeDisplay: state.previewModeDisplay, optionsObject: state.optionsObject, editMode: state.editMode };
                return updatedState_question_text;
            case "PREVIEW_MODE":
                const updatedState_preview_mode = { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: !state.previewModeDisplay, optionsObject: state.optionsObject, editMode: state.editMode };
                return updatedState_preview_mode;
            case "ADD_OPTION":
                state.optionsObject[optionElementUUID] = { optionText: '', optionScore: 1 };
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, optionsObject: state.optionsObject, editMode: state.editMode };
            case "EDIT_OPTION_TEXT":
                state.optionsObject[optionElementUUID].optionText = action.content;
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, optionsObject: state.optionsObject, editMode: state.editMode };
            case "EDIT_OPTION_SCORE":
                state.optionsObject[optionElementUUID].optionScore = Number.isNaN(parseInt(action.content)) ? 1 : parseInt(action.content);
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, optionsObject: state.optionsObject, editMode: state.editMode };
            case "DELETE_OPTION":
                delete state.optionsObject[optionElementUUID];
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, optionsObject: state.optionsObject, editMode: state.editMode };
            case "EDIT":
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, optionsObject: state.optionsObject, editMode: !state.editMode };
        }
    }

    // function for updating the text of the option
    function editOptionElementTextFunction(optionElementUUID, textContent) {
        updateOptionsObject({ type: "EDIT_OPTION_TEXT", value: optionElementUUID, content: textContent });
    }

    // function for updating the score of the option
    function editOptionElementScoreFunction(optionElementUUID, optionScore) {
        updateOptionsObject({ type: "EDIT_OPTION_SCORE", value: optionElementUUID, content: optionScore })
    }

    // function for sending the changes of the description card to the parent component
    function saveChanges(state) {
        props.stateChangeMethod(state);
    }

    // function for handling the display of the preview button
    function handlePreviewButtonDisplay(state) {
        return state.editMode ?
            (<>
                {state.previewModeDisplay ?
                    (<FontAwesomeIcon icon={faEye} onClick={() => updateOptionsObject({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900" title="Preview mode enabled."></FontAwesomeIcon>) :
                    (<FontAwesomeIcon icon={faEyeSlash} onClick={() => updateOptionsObject({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900" title="Preview mode disabled."></FontAwesomeIcon>)
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

    return (<>
        <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* card first row */}
            <div className="flex flex-row h-9 my-2">
                <div className="w-1/2 text-lg text-blue-900"> {props.elementIndex} | Point Input Card</div>
                {/* Edit / Delete Buttons */}
                <div className="w-1/2 flex justify-around">
                    {state.editMode ?
                        (<>
                            <div className="inline-block w-5/12 text-center border-2 my-1 border-transparent rounded"></div>
                            <div className="inline-block w-5/12 text-center border-2 border-blue-900 my-1 rounded hover:bg-blue-900 hover:text-white cursor-pointer" onClick={() => { updateOptionsObject({ type: "EDIT" }); saveChanges(state) }}>Done</div>
                        </>)
                        :
                        (<>
                            <div className="inline-block w-5/12 text-center border-2 border-blue-900 my-1 rounded hover:bg-blue-900 hover:text-white cursor-pointer" onClick={() => updateOptionsObject({ type: "EDIT" })}>Edit</div>
                            <div className="inline-block w-5/12 text-center border-2 border-red-500 my-1 rounded hover:bg-red-500 hover:text-white cursor-pointer" onClick={() => props.deleteMethod(state)}>Delete</div>
                        </>)}
                </div>
                {/* Edit / Delete Buttons */}
            </div>
            {/* card first row */}
            {/* card heading row */}
            <div className="h-9 w-full flex flex-row justify-between">
                <input className={state.editMode ? "h-5/6 w-5/6 px-1 text-blue-900" : "h-5/6 w-5/6 px-1 text-blue-900 cursor-not-allowed"} readOnly={!state.editMode} placeholder="Edit Question Text ..." value={state.questionText} onChange={event => updateOptionsObject({ type: "QUESTION_TEXT", value: event.target.value })} />
                {handlePreviewButtonDisplay(state)}
            </div>
            {/* card heading row */}
            <div className="">
                {state.editMode ? (<div className="text-blue-900 text-sm p-1">Options Added:</div>):
                (<>
                {Object.keys(state.optionsObject).length > 0 ? (<div className="text-sm text-blue-900">Options Added:</div>) : (<div className="text-blue-900 text-sm"><span className="font-bold">NOTE:</span> No options has been added.</div>)}
                </>)}
                {/*input row section */}
                <div className="w-full p-1">
                    {Object.keys(state.optionsObject).map((item, index) => {
                        return <OptionElement optionElementText={state.optionsObject[item].optionText}
                            optionElementScore={state.optionsObject[item].optionScore}
                            editOptionTextFunction={editOptionElementTextFunction}
                            editOptionScoreFunction={editOptionElementScoreFunction}
                            deleteOptionFunction={() => updateOptionsObject({ type: "DELETE_OPTION", value: item })}
                            optionElementuuid={item}
                            elementIndex={index}
                            editModeVal={state.editMode}
                            key={index}></OptionElement>
                    })}
                </div>
                {/* input row section */}
                {state.editMode ?
                    (<>
                        <div className=" flex flex-row justify-end mb-1.5 justify-between">
                            <div className="text-blue-900 text-sm pt-2.5">
                                <span className="font-bold">NOTE:</span> A score must be provided for each option.
                            </div>
                            <div className="bg-blue-500 p-2 text-center text-white cursor-pointer hover:bg-blue-600 rounded mr-1" onClick={() => updateOptionsObject({ type: "ADD_OPTION", value: uuidv4() })}>
                                <FontAwesomeIcon icon={faPlus} className=""></FontAwesomeIcon> Add Option
                            </div>
                        </div>
                    </>) : (<></>)}
            </div>
        </div>
    </>)
}

export default PointInputCard;