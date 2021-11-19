import { faEye, faEyeSlash, faInfoCircle, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer, useState } from "react";
import OptionElement from "./optionElement";
import { v4 as uuidv4 } from 'uuid';

function SelectInputCard(props) {

    const initialState = { type: props.cardElement.type, name: props.cardElement.name, uuid: props.cardElement.uuid, questionText: props.cardElement.questionText, previewModeDisplay: props.cardElement.previewModeDisplay, maxSelectionVal: props.cardElement.maxSelectionVal, optionsObject: props.cardElement.optionsObject, editMode: props.cardElement.editMode };
    const [state, updateOptionsObject] = useReducer(handleoptionsObjectChanges, initialState);

    // function for handling the changes in the options array
    function handleoptionsObjectChanges(state, action) {
        const optionElementUUID = action.value;
        switch (action.type) {
            case "QUESTION_TEXT":
                const updatedState_question_text = { type: state.type, name: state.name, uuid: state.uuid, questionText: action.value, previewModeDisplay: state.previewModeDisplay, maxSelectionVal: state.maxSelectionVal, optionsObject: state.optionsObject, editMode: state.editMode };
                return updatedState_question_text;
            case "PREVIEW_MODE":
                const updatedState_preview_mode = { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: !state.previewModeDisplay, maxSelectionVal: state.maxSelectionVal, optionsObject: state.optionsObject, editMode: state.editMode };
                return updatedState_preview_mode;
            case "MAX_SELECTIONS":
                const max_selection_value = Number.isNaN(parseInt(action.value)) ? 1 : parseInt(action.value);
                const updatedState_max_selections = { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, maxSelectionVal: max_selection_value, optionsObject: state.optionsObject, editMode: state.editMode };
                return updatedState_max_selections;
            case "ADD_OPTION":
                state.optionsObject[optionElementUUID] = "";
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, maxSelectionVal: state.maxSelectionVal, optionsObject: state.optionsObject, editMode: state.editMode };
            case "DELETE_OPTION":
                delete state.optionsObject[optionElementUUID];
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, maxSelectionVal: state.maxSelectionVal, optionsObject: state.optionsObject, editMode: state.editMode };
            case "EDIT_OPTION":
                state.optionsObject[optionElementUUID] = action.content;
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, maxSelectionVal: state.maxSelectionVal, optionsObject: state.optionsObject, editMode: state.editMode };
            case "EDIT":
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, maxSelectionVal: state.maxSelectionVal, optionsObject: state.optionsObject, editMode: !state.editMode };
        }
    }

    function optionElementTextFunction(optionElementUUID, textContent) {
        updateOptionsObject({ type: "EDIT_OPTION", value: optionElementUUID, content: textContent });
    }

    // function for handling the display of the preview button
    function handlePreviewButtonDisplay(state) {
        return state.editMode ?
            (<>
                {state.previewModeDisplay ?
                    (<FontAwesomeIcon icon={faEye} onClick={() => updateOptionsObject({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900" title="Preview mode enabled"></FontAwesomeIcon>) :
                    (<FontAwesomeIcon icon={faEyeSlash} onClick={() => updateOptionsObject({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900" title="Preview mode disabled"></FontAwesomeIcon>)
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

    // function for sending the changes of the description card to the parent component
    function saveChanges(state) {
        props.stateChangeMethod(state);
    }

    return (<>
        <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* card first row */}
            <div className="flex flex-row h-9 my-2">
                <div className="w-1/2 text-lg text-blue-900"> {props.elementIndex}  | Select Input Card</div>
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
                <div className={state.editMode ? "text-blue-900 text-sm p-1" : "text-blue-900 text-sm"}>
                    {state.editMode ? (<>Add Option(s):</>)
                        : (<>{Object.keys(state.optionsObject).length > 0 ? (<>Option(s) Added:</>) : (<span><span className="font-bold" >NOTE: </span> <span>No options has been added !</span></span>)}</>)
                    }
                </div>
                {/*input row section */}
                <div className={Object.keys(state.optionsObject).length > 0 ? "w-full p-1" : "w-full"}>
                    {Object.keys(state.optionsObject).map((item, index) => { return <OptionElement editModeVal={state.editMode} elementValue={state.optionsObject[item]} editFunction={optionElementTextFunction} deleteFunction={() => updateOptionsObject({ type: "DELETE_OPTION", value: item })} optionElementuuid={item} elementIndex={index} key={index}></OptionElement> })}
                </div>
                {/* input row section */}
                <div className=" flex flex-row justify-between mb-1.5">
                    {state.editMode ?
                        (<div className="w-1/5 h-9 ml-1.5">
                            <div className="text-blue-900 text-xs w-max">Max options users can select:</div>
                            <input className={state.editMode ? "text-sm border-1 rounded px-1 w-32 border-blue-900 py-0.5" : "text-sm border rounded px-1 w-32 border-opacity-50 py-0.5 cursor-not-allowed"} readOnly={!state.editMode} type="number" onKeyDown={event => { event.preventDefault() }} placeholder="Enter value ..." min="1" value={state.maxSelectionVal} onChange={event => updateOptionsObject({ type: "MAX_SELECTIONS", value: event.target.value })} />
                        </div>) : (<></>)}
                    {state.editMode ?
                        (<div className="bg-blue-500 p-2 text-center text-white cursor-pointer hover:bg-blue-600 rounded mr-1" onClick={() => updateOptionsObject({ type: "ADD_OPTION", value: uuidv4() })}>
                            <FontAwesomeIcon icon={faPlus} className=""></FontAwesomeIcon> Add Input Option
                        </div>) :
                        (<></>)}
                </div>
            </div>
            {state.editMode ? 
            (<div className="text-sm mx-1.5 text-blue-900 mt-2.5"><span className="font-bold">NOTE:</span> The default value for the maximum number of option(s) that the users can select is 1 and this value must be greater than 0. </div>):(<></>)}
        </div>
    </>)
}

export default SelectInputCard;