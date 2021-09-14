import { faEye, faEyeSlash, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer, useState } from "react";
import UnitElement from "./unitElement";
import { v4 as uuidv4 } from 'uuid';

function NumericalInputCard(props) {

    const initialState = { questionText: '', previewModeDisplay: true, minInput: 0, maxInput: 100, unitsObject: {} };
    const [state, updateNumericalInputCard] = useReducer(handleNumericalInputCardChanges, initialState);

    function handleNumericalInputCardChanges(state, action) {
        switch (action.type) {
            case "QUESTION_TEXT":
                const updatedState_question_text = { questionText: action.value, previewModeDisplay: state.previewModeDisplay, minInput: state.minInput, maxInput: state.maxInput, unitsObject: state.unitsObject };
                console.log(updatedState_question_text);
                return updatedState_question_text;
            case "PREVIEW_MODE":
                const updatedState_preview_mode = { questionText: state.questionText, previewModeDisplay: !state.previewModeDisplay, minInput: state.minInput, maxInput: state.maxInput, unitsObject: state.unitsObject };
                console.log(updatedState_preview_mode);
                return updatedState_preview_mode;
            case "MIN_INPUT":
                const updatedState_min_input = { questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, minInput: parseInt(action.value), maxInput: state.maxInput, unitsObject: state.unitsObject };
                console.log(updatedState_min_input);
                return updatedState_min_input;
            case "MAX_INPUT":
                const updatedState_max_input = { questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, minInput: state.minInput, maxInput: parseInt(action.value), unitsObject: state.unitsObject };
                console.log(updatedState_max_input);
                return updatedState_max_input;
            case "ADD_UNIT":
                const unitElementUUID_add_unit = action.value;
                state.unitsObject[unitElementUUID_add_unit] = "";
                console.log(state);
                return { questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, minInput: state.minInput, maxInput: state.maxInput, unitsObject: state.unitsObject };
            case "DELETE_UNIT":
                const unitElementUUID_delete_unit = action.value;
                delete state.unitsObject[unitElementUUID_delete_unit];
                console.log(state);
                return { questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, minInput: state.minInput, maxInput: state.maxInput, unitsObject: state.unitsObject };
            case "EDIT_UNIT":
                const unitElementUUID_edit_unit = action.value;
                state.unitsObject[unitElementUUID_edit_unit] = action.content;
                console.log(state);
                return { questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, minInput: state.minInput, maxInput: state.maxInput, unitsObject: state.unitsObject };
        }
    }

    function unitElementTextFunction(unitElementUUID, textContent) {
        updateNumericalInputCard({ type: "EDIT_UNIT", value: unitElementUUID, content: textContent });
    }

    return (<>
        <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* card first row */}
            <div className="flex flex-row h-9 my-2">
                <div className="w-2/3 text-lg text-blue-900"> {props.elementIndex} | Numerical Input Card</div>
                <div className="w-1/3 bg-red-500 hover:bg-red-400 text-white flex justify-around cursor-pointer text-center p-1.5 rounded mr-1">
                    <div><FontAwesomeIcon icon={faTrashAlt} className="mx-2"></FontAwesomeIcon>Delete</div>
                </div>
            </div>
            {/* card first row */}
            {/* card heading row */}
            <div className="h-9 w-full flex flex-row justify-between">
                <input className="h-5/6 w-5/6 px-1 text-blue-900" placeholder="Edit Question Text ..." value={state.questionText} onChange={event => updateNumericalInputCard({ type: "QUESTION_TEXT", value: event.target.value })} />
                {state.previewModeDisplay ?
                    (<FontAwesomeIcon icon={faEye} onClick={() => updateNumericalInputCard({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900"></FontAwesomeIcon>) :
                    (<FontAwesomeIcon icon={faEyeSlash} onClick={() => updateNumericalInputCard({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900"></FontAwesomeIcon>)}
            </div>
            {/* card heading row */}
            {/* min/max input row */}
            <div className="flex justify-between px-1">
                <div>
                    <div className="text-blue-900">Min Input</div>
                    <input className="border w-36 rounded px-1" type="number" min="0" placeholder="0" value={state.minInput} onChange={event => updateNumericalInputCard({ type: "MIN_INPUT", value: event.target.value })} />
                </div>
                <div>
                    <div className="text-blue-900">Max Input</div>
                    <input className="border w-36 rounded px-1" type="number" min="0" placeholder="100" value={state.maxInput} onChange={event => updateNumericalInputCard({ type: "MAX_INPUT", value: event.target.value })} />
                </div>
            </div>
            {/* min/max input row */}
            <div className="mt-2">
                <div className="text-blue-900 text-sm p-1">Add Allowed Unit</div>
                {/*input row section */}
                <div className="w-full p-1">
                    {/* <UnitElement></UnitElement> */}
                    {Object.keys(state.unitsObject).map((item, index) => { return (<UnitElement elementValue={state.unitsObject[item]} editFunction={unitElementTextFunction} deleteFunction={() => updateNumericalInputCard({ type: "DELETE_UNIT", value: item })} unitElementUUID={item} key={index} elementIndex={index}></UnitElement>) })}
                </div>
                {/* input row section */}
                <div className=" flex flex-row-reverse">
                    <div className="bg-blue-500 py-2 px-3 text-center pt-1.5 text-white cursor-pointer hover:bg-blue-600 rounded mr-1" onClick={() => updateNumericalInputCard({ type: "ADD_UNIT", value: uuidv4() })}>
                        <FontAwesomeIcon icon={faPlus} className=""></FontAwesomeIcon> Units
                    </div>
                </div>
            </div>
            {/* min/max input row */}
        </div>
    </>)
}

export default NumericalInputCard;