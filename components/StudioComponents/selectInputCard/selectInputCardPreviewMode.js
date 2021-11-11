import { faEye, faEyeSlash, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer, useState } from "react";
import OptionElement from "./optionElement";
import { v4 as uuidv4 } from 'uuid';

function SelectInputCardPreviewMode(props) {


    const [optionsSelectedArray, setOptionsSelectedArray] = useState([]);

    // function for updating the options selected array
    function updateOptionsSelectedArray(optionSelectedUUID, optionsSelectedArrayCopy, MaxOptionsUsersCanSelect) {
        // if the option has already been selected, then remove it from the array, 
        // else add it to the array making sure there are only two items in the array.
        if (optionsSelectedArrayCopy.includes(optionSelectedUUID)) {
            const indexOfItemToBeRemoved = optionsSelectedArrayCopy.indexOf(optionSelectedUUID);
            const updatedOptionsSelectedArray = optionsSelectedArrayCopy.splice(indexOfItemToBeRemoved, 1);
            setOptionsSelectedArray(updatedOptionsSelectedArray);
            console.log('Selected option UUID: ', optionSelectedUUID, 'Options selected array: ', optionsSelectedArray);
            return null;
        } else if (optionsSelectedArrayCopy.length === MaxOptionsUsersCanSelect) {
            optionsSelectedArrayCopy.shift();
        }
        optionsSelectedArrayCopy.push(optionSelectedUUID);
        setOptionsSelectedArray(optionsSelectedArrayCopy);
        console.log('Selected option UUID: ', optionSelectedUUID, 'Options selected array: ', optionsSelectedArray);
        return null;
    }

    // function for adding styling the options as per the user selection
    function updateOptionsStyling(optionSelectedUUID, optionsSelectedArray) {
        if (optionsSelectedArray.includes(optionSelectedUUID)) { 
            return 'w-full h-9 mb-1 bg-blue-200 border-1 border-blue-900 rounded flex flex-row cursor-pointer hover:bg-blue-200 hover:border-blue-900'; 
        } else {
            return 'w-full h-9 mb-1 bg-blue-100 border-1 border-blue-400 rounded flex flex-row cursor-pointer hover:bg-blue-200 hover:border-blue-900'; 
        }
    }

    return (<>
        <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* question row */}
            <div className="inline-block font-semibold text-lg w-full text-blue-900 mb-2">
                {props.cardElement.questionText}
            </div>
            {/* question row */}
            {/* options row */}
            {Object.keys(props.cardElement.optionsObject).map((keyName, index) =>
            (<div className={updateOptionsStyling(keyName, optionsSelectedArray)}
                onClick={() => updateOptionsSelectedArray(keyName, optionsSelectedArray, props.cardElement.maxSelectionVal)}
                key={keyName}>
                <div className="flex flex-row justify-around py-0.5 mx-0.5">
                    <div className="h-full w-9 text-center pt-0.5 border rounded bg-blue-600 text-white">{index}</div>
                </div>
                <div className="font-bold pt-1 pl-2 text-lg text-blue-800">{props.cardElement.optionsObject[keyName]}</div>
            </div>)

            )}
            {/* options row */}
            {/* note row */}
            <div className="text-blue-900 text-sm mt-2"><b>NOTE:</b> You can only select {props.cardElement.maxSelectionVal} option(s).</div>
            {/* note row */}
        </div></>)
}

export default SelectInputCardPreviewMode;