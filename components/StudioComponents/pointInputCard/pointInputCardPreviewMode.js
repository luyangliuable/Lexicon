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

    function addOptionToOptionsSelectedArray(UUID, score, array) {
        const currentOption = { optionUUID: UUID, optionScore: score };
        if (!array.some(option => option.optionUUID === currentOption.optionUUID)) {
            if (array.length === parseInt(props.cardElement.maxSelectionVal)) {
                alert(`You can only select ${props.cardElement.maxSelectionVal} options !`);
            } else {
                setOptionsSelectedArray(oldArray => [...oldArray, currentOption]);
                props.inputCardtotalScoreUpdateMethod(currentOption.optionScore, "ADD");
                updateTotalScore(totalScore + currentOption.optionScore);
            }
        }
    }

    function removeOptionFromOptionsSelectedArray(UUID, score, array) {
        const optionToBeRemoved = { optionUUID: UUID, optionScore: score };
        if (array.some(option => option.optionUUID === optionToBeRemoved.optionUUID)) {
            setOptionsSelectedArray(oldArray => oldArray.filter(option => option.optionUUID != optionToBeRemoved.optionUUID));
            props.inputCardtotalScoreUpdateMethod(optionToBeRemoved.optionScore, "SUBTRACT");
            updateTotalScore(totalScore - optionToBeRemoved.optionScore);
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
                        {(props.cardElement.maxSelectionVal > 1) ?
                            (<>
                                <div className="flex text-sm my-1 w-1/3 border-2 border-blue-900 mr-3 rounded">
                                    <div className={optionsSelectedArray.some(option => option.optionUUID === keyName) ? optionNotSelectedStyleString : optionSelectedStyleString}
                                        onClick={() => removeOptionFromOptionsSelectedArray(keyName, props.cardElement.optionsObject[keyName].optionScore, optionsSelectedArray)}>
                                        <span className="pt-px">No</span>
                                        <span className="pt-px">0</span>
                                    </div>
                                    <div className={optionsSelectedArray.some(option => option.optionUUID === keyName) ? optionSelectedStyleString : optionNotSelectedStyleString}
                                        onClick={() => addOptionToOptionsSelectedArray(keyName, props.cardElement.optionsObject[keyName].optionScore, optionsSelectedArray)}>
                                        <span className="pt-px">Yes</span>
                                        <span className="pt-px">+{props.cardElement.optionsObject[keyName].optionScore}</span>
                                    </div>
                                </div>
                            </>) :
                            (<>
                                <div className="flex">
                                    <div className="px-1.5 py-0.5 m-1">
                                        <input type="radio" className="cursor-pointer" name={props.cardElement.uuid}
                                        onClick={() => {
                                            updateTotalScore(props.cardElement.optionsObject[keyName].optionScore);
                                            props.inputCardtotalScoreUpdateMethod(props.cardElement.optionsObject[keyName].optionScore-totalScore, 'ADD');
                                            }}></input>
                                    </div>
                                    <div className="text-blue-900 border-1 rounded border-blue-900 m-1 px-1 bg-blue-200 font-medium w-12 text-center">
                                        +<span className="ml-0.5">{props.cardElement.optionsObject[keyName].optionScore}</span>
                                    </div>
                                </div>
                            </>)}
                    </div>
                ))}
            </div>
            {/* options row */}
            {/* total score row */}
            <div className="flex px-1 w-full text-blue-900 text-sm">
                <span className="font-bold mr-1">NOTE: </span> You can only select {props.cardElement.maxSelectionVal} option(s).
            </div>
            {/* total score row */}
        </div>
    </>);
}

export default PointInputCardPreviewMode;