import { faEye, faEyeSlash, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer, useState } from "react";
import UnitElement from "./unitElement";
import { v4 as uuidv4 } from 'uuid';
import { DropdownButton, Dropdown } from "react-bootstrap";

function NumericalInputCardPreviewMode(props) {

    const [dropDownMenuOptionSelected, setdropDownMenuOptionSelected] = useState('');

    return (<>
        <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* question row */}
            <div className="inline-block font-semibold text-xl w-full text-blue-900">
                {props.cardElement.questionText}
            </div>
            {/* question row */}
            {/* response row */}
            <div className="my-1.5 flex flex-row justify-between px-1">
                <div className="w-2/5">
                    <div className="pt-2 text-blue-900">Enter your response:</div>
                </div>
                <div className="w-2/5 flex justify-around">
                    <input className="w-full h-8 my-1 border-2 border-blue-900 rounded px-1 bg-blue-100" placeholder="Enter value ..." type="number" min={props.cardElement.minInput} max={props.cardElement.maxInput}></input>
                </div>
            </div>
            {Object.keys(props.cardElement.unitsObject).length > 0 ? 
            (<>
            <div className="my-1.5 flex flex-row justify-between px-1">
                <div className="w-3/5">
                    <div className="pt-2 text-blue-900">Select a unit from the menu:</div>
                </div>
                <div className="w-2/5 flex justify-around">
                    <DropdownButton className="w-full" id="dropdown-item-button" title={dropDownMenuOptionSelected.length === 0 ? "Select Unit": props.cardElement.unitsObject[dropDownMenuOptionSelected]}>
                        {Object.keys(props.cardElement.unitsObject).map((keyName, index) =>
                            (<Dropdown.Item as="button" onClick={()=>{setdropDownMenuOptionSelected(keyName)}}>{props.cardElement.unitsObject[keyName]}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
            </div>
            </>):
            (<></>)}
            {/* response row */}
            {/* note row */}
            <div className="text-blue-900"><span className="font-bold">NOTE:</span> Your response must range from {props.cardElement.minInput} to {props.cardElement.maxInput}.</div>
            {/* note row */}
        </div></>);
}

export default NumericalInputCardPreviewMode;