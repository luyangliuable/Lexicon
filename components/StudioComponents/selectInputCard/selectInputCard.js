import { faEye, faEyeSlash, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer, useState } from "react";
import OptionElement from "./optionElement";
import { v4 as uuidv4 } from 'uuid';

function SelectInputCard(props) {

    const initialState = { questionText: '', previewModeDisplay: true, maxSelectionVal: 1, optionsObject: {} };
    const [questionText, updateQuestionText] = useState("");
    const [maxSelectionVal, updateMaxSelection] = useState(1);
    const [previewModeDisplayDisplay, updatepreviewModeDisplayDisplay] = useState(true);
    const [state, updateOptionsObject] = useReducer(handleoptionsObjectChanges, initialState);

    // function for handling the changes in the options array
    function handleoptionsObjectChanges(state, action) {
        const optionElementUUID = action.value;
        switch (action.type) {
            case "QUESTION_TEXT":
                const updatedState_question_text = { questionText: action.value, previewModeDisplay: state.previewModeDisplay, maxSelectionVal: state.maxSelectionVal, optionsObject: state.optionsObject };
                console.log(updatedState_question_text);
                return updatedState_question_text;
            case "PREVIEW_MODE":
                const updatedState_preview_mode = { questionText: state.questionText, previewModeDisplay: !state.previewModeDisplay, maxSelectionVal: state.maxSelectionVal, optionsObject: state.optionsObject };
                console.log(updatedState_preview_mode);
                return updatedState_preview_mode;
            case "MAX_SELECTIONS":
                const updatedState_max_selections = { questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, maxSelectionVal: parseInt(action.value), optionsObject: state.optionsObject };
                console.log(updatedState_max_selections);
                return updatedState_max_selections;
            case "ADD_UNIT":
                state.optionsObject[optionElementUUID] = "";
                console.log(state);
                return { questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, maxSelectionVal: state.maxSelectionVal, optionsObject: state.optionsObject };
            case "DELETE_UNIT":
                delete state.optionsObject[optionElementUUID];
                console.log(state);
                return { questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, maxSelectionVal: state.maxSelectionVal, optionsObject: state.optionsObject };
            case "EDIT_UNIT":
                state.optionsObject[optionElementUUID] = action.content;
                console.log(state);
                return { questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, maxSelectionVal: state.maxSelectionVal, optionsObject: state.optionsObject };
        }
    }

    function optionElementTextFunction(optionElementUUID, textContent) {
        updateOptionsObject({ type: "EDIT_UNIT", value: optionElementUUID, content: textContent });
    }

    return (<>
        <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* card first row */}
            <div className="flex flex-row h-9 my-2">
                <div className="w-2/3 text-lg text-blue-900"> {props.elementIndex}  | Select Input Card</div>
                <div className="w-1/3 bg-red-500 hover:bg-red-400 text-white flex justify-around cursor-pointer text-center p-1.5 rounded mr-1">
                    <div><FontAwesomeIcon icon={faTrashAlt} className="mx-2"></FontAwesomeIcon>Delete</div>
                </div>
            </div>
            {/* card first row */}
            {/* card heading row */}
            <div className="h-9 w-full flex flex-row justify-between">
                <input className="h-5/6 w-5/6 px-1 text-blue-900" placeholder="Edit Question Text ..." value={state.questionText} onChange={event => updateOptionsObject({ type: "QUESTION_TEXT", value: event.target.value })} />
                {state.previewModeDisplay ?
                    (<FontAwesomeIcon icon={faEye} onClick={() => updateOptionsObject({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900"></FontAwesomeIcon>) :
                    (<FontAwesomeIcon icon={faEyeSlash} onClick={() => updateOptionsObject({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900"></FontAwesomeIcon>)}
            </div>
            {/* card heading row */}
            <div className="">
                <div className="text-blue-900 text-sm p-1">Add Options</div>
                {/*input row section */}
                <div className="w-full p-1">
                    {Object.keys(state.optionsObject).map((item, index) => { return <OptionElement elementValue={state.optionsObject[item]} editFunction={optionElementTextFunction} deleteFunction={() => updateOptionsObject({ type: "DELETE_UNIT", value: item })} optionElementuuid={item} elementIndex={index} key={index}></OptionElement> })}
                </div>
                {/* input row section */}
                <div className=" flex flex-row justify-between mb-1.5">
                    <div className="w-1/5 h-9 ml-1.5">
                        <div className="text-blue-900 text-xs">Max Selections</div>
                        <input className="text-sm border rounded px-1 w-20 border-opacity-50" type="number" placeholder="1" min="0" value={state.maxSelectionVal} onChange={event => updateOptionsObject({ type: "MAX_SELECTIONS", value: event.target.value })} />
                    </div>
                    <div className="bg-blue-500 p-2 text-center text-white cursor-pointer hover:bg-blue-600 rounded mr-1" onClick={() => updateOptionsObject({ type: "ADD_UNIT", value: uuidv4() })}>
                        <FontAwesomeIcon icon={faPlus} className=""></FontAwesomeIcon> Select Item
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default SelectInputCard;