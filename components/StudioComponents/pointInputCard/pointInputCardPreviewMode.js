import { faEye, faEyeSlash, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer, useState } from "react";
import OptionElement from "./optionElement";
import { v4 as uuidv4 } from 'uuid';

function PointInputCardPreviewMode(props) {

    const [totalScore, updateTotalScore] = useState(0);
    const [optionsSelectedArray, setOptionsSelectedArray] = useState([]);
    const optionSelectedStyleString = 'w-1/2 px-1.5 border-r border-blue-900 flex justify-between cursor-pointer bg-blue-600 text-white';
    const optionNotSelectedStyleString = 'w-1/2 px-1.5 border-l border-blue-900 flex justify-between cursor-pointer text-blue-900';

    function addOptionToOptionsSelectedArray(UUID, score, array){
        if (!array.includes(UUID)) {
            setOptionsSelectedArray(oldarray => [...oldarray, UUID]);
            const updatedScore = totalScore + score;
            updateTotalScore(updatedScore);
        }
    }

    function removeOptionFromOptionsSelectedArray(UUID, score, array) {
        if (array.includes(UUID)) {
            const updatedArray = array.filter(optionUUID => optionUUID != UUID);
            setOptionsSelectedArray(updatedArray);
            const updatedScore = totalScore - score;
            updateTotalScore(updatedScore);
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
            <div className="">
                {Object.keys(props.cardElement.optionsObject).map((keyName, index) => (
                    <div key={keyName} className='w-full h-9 mb-1 bg-blue-100 border-1 border-blue-400 rounded flex flex-row justify-between'>
                        <div className="flex">
                            <div className="flex flex-row justify-around py-0.5 mx-0.5">
                                <div className="h-full w-9 text-center pt-0.5 border rounded bg-blue-600 text-white">{index}</div>
                            </div>
                            <div className="font-bold pt-1 pl-2 text-lg text-blue-800">{props.cardElement.optionsObject[keyName].optionText}</div>
                        </div>
                        <div className="flex text-sm my-1 w-1/3 border-2 border-blue-900 mr-3 rounded">
                            <div className={optionsSelectedArray.includes(keyName) ? optionNotSelectedStyleString: optionSelectedStyleString}
                                onClick={() => removeOptionFromOptionsSelectedArray(keyName, props.cardElement.optionsObject[keyName].optionScore, optionsSelectedArray)}>
                                <span className="pt-px">No</span>
                                <span className="pt-px">0</span>
                            </div>
                            <div className={optionsSelectedArray.includes(keyName) ? optionSelectedStyleString: optionNotSelectedStyleString}
                                onClick={() => addOptionToOptionsSelectedArray(keyName, props.cardElement.optionsObject[keyName].optionScore, optionsSelectedArray)}>
                                <span className="pt-px">Yes</span>
                                <span className="pt-px">+{props.cardElement.optionsObject[keyName].optionScore}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* options row */}
            {/* total score row */}
            <div className="flex flex-row justify-between px-1 mt-2 text-lg w-full">
                <div className="text-blue-900 font-bold w-max pt-1">Total Score:</div>
                <div className="text-blue-900 w-1/5 text-center border-2 border-blue-900 rounded bg-blue-100">{totalScore}</div>
            </div>
            {/* total score row */}
        </div>
    </>);
}

export default PointInputCardPreviewMode;