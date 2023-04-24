import React, { useState, useReducer } from "react";

function SelectInputCardPreviewMode(props) {
    const [optionsSelectedArray, setOptionsSelectedArray] = useState([]);

    const updatePreviewBasedOnSelection = (newOptionsSelectedArray) => {
        const valueArray = [];

        for (var uuid of newOptionsSelectedArray) {
            const selectedValue = props.cardElement.optionsObject[uuid];
            valueArray.push(selectedValue);
        }


        const res = {
            type: "input",
            valueType: "number[]",
            value: valueArray,
            uuid: props.cardElement.uuid
        };

        props.stateChangeMethod(res);
    };

    // function for updating the options selected array
    function updateOptionsSelectedArray(optionSelectedUUID, optionsSelectedArrayCopy, MaxOptionsUsersCanSelect) {
        var newOptionsSelectedArray = [];

        if (optionsSelectedArrayCopy.includes(optionSelectedUUID)) {
            /*
             * Remove a selected item from selection list
             */
            setOptionsSelectedArray(oldArray => {
                var newOptionsSelectedArray = oldArray.filter(item => item != optionSelectedUUID);
                updatePreviewBasedOnSelection(newOptionsSelectedArray);
                return newOptionsSelectedArray;
            });
        } else if (optionsSelectedArrayCopy.length === MaxOptionsUsersCanSelect) {
            /*
             * Remove the last selection and add the new selection due to max number of selections
             */
            setOptionsSelectedArray(oldArray => {
                oldArray.shift();
                newOptionsSelectedArray = [...oldArray, optionSelectedUUID];
                updatePreviewBasedOnSelection(newOptionsSelectedArray);
                return newOptionsSelectedArray;
            });
        } else {
            /*
             * Add a selected item from selection list
             */
            setOptionsSelectedArray(oldArray => {
                newOptionsSelectedArray = [...oldArray, optionSelectedUUID];
                updatePreviewBasedOnSelection(newOptionsSelectedArray);
                return newOptionsSelectedArray;
            });
        }
    }

    // function for adding styling the options as per the user selection
    function updateOptionsStyling(optionSelectedUUID, optionsSelectedArray) {
        if (optionsSelectedArray.includes(optionSelectedUUID)) {
            return "w-full h-9 mb-1 bg-blue-300 border-1 border-blue-800 rounded flex flex-row cursor-pointer hover:bg-gray-200 hover:border-blue-900";
        } else {
            return "w-full h-9 mb-1 bg-blue-50 border-1 border-blue-200 rounded flex flex-row cursor-pointer hover:bg-gray-200 hover:border-blue-900";
        }
    }

    return (
        <>
            <div className="transition ease-in-out duration-500 w-full none:shadow hover:shadow-md border	px-2 rounded-sm text-blue-900 text-lg py-2 mb-2 select-none bg-gray-50">
                {/* question row */}
                <div className="min-h-full font-semibold text-lg text-blue-900 mb-2 break-all">
                    {props.cardElement.questionText}
                </div>
                {/* question row */}
                {/* options row */}
                {
                    Object.keys(props.cardElement.optionsObject).map((keyName, index) => (
                        <div
                            className={updateOptionsStyling(keyName, optionsSelectedArray)}
                            onClick={
                                (e) =>
                                    updateOptionsSelectedArray(
                                        keyName,
                                        optionsSelectedArray,
                                        props.cardElement.maxSelectionVal,
                                    )
                            }

                            key={keyName}
                        >
                            <div className="flex flex-row justify-around py-0.5 mx-0.5">
                                <div className="h-full w-9 text-center pt-0.5 border rounded bg-blue-600 text-white">
                                    {index}
                                </div>
                            </div>
                            <div className="font-bold mx-2 mt-1 text-lg text-blue-800 overflow-x-hidden">
                                {props.cardElement.optionsObject[keyName]}
                            </div>
                        </div>
                    ))
                }
                {/* options row */}
                {/* note row */}
                <div className="text-blue-900 text-sm mt-2">
                    <b>NOTE:</b> You can only select {props.cardElement.maxSelectionVal}{" "}
                    option(s).
                </div>
                {/* note row */}
            </div>
        </>
    );
}

export default SelectInputCardPreviewMode;
