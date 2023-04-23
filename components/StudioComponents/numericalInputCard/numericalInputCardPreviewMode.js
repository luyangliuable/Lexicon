import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

function NumericalInputCardPreviewMode(props) {
    const [dropDownMenuOptionSelected, setdropDownMenuOptionSelected] = useState("");

    const checkValueWithinRange = (target) => {
        var value = target.value;
        var max = props.cardElement.maxInput;
        var min = props.cardElement.minInput;

        if (value > max || value < min) {
            // target.setAttribute("disabled", "true");
            // make colour red
            target.style.color = "red";
        } else {
            // target.removeAttribute("disabled");
            target.style.color = "black";
        }
    };


    return (
        <>
            <div className="transition ease-in-out duration-500 w-full none:shadow hover:shadow-md border	px-2 rounded-sm text-blue-900 text-lg py-2 mb-2 select-none">
                {/* question row */}
                <div className="inline-block font-semibold text-xl w-full text-blue-900 break-all">
                    {props.cardElement.questionText}
                </div>
                {/* question row */}
                {/* response row */}
                <div className="card-error-display" style={{
                    visibility:
                    (props.cardElement.value < props.cardElement.minInput || props.cardElement.value > props.cardElement.maxInput) ? 'visible' : 'hidden'
                }}>

                {
                    props.cardElement.value < props.cardElement.minInput
                        ? "Warning: Input value is too small"
                        : props.cardElement.value > props.cardElement.maxInput
                        && "Warning: Input value is too large"
                }
                </div>
                <div className="my-1.5 flex flex-row justify-between px-1">
                    <div className="w-2/5">
                        <div className="pt-2 text-blue-900">Enter your response:</div>
                    </div>
                    <div className="w-2/5 flex justify-around">
                        <input
                            className="w-full h-8 my-1 border-2 border-blue-900 rounded px-1 bg-blue-100"
                            placeholder="Enter value ..."
                            type="number"
                            min={props.cardElement.minInput}
                            max={props.cardElement.maxInput}
                            value={props.cardElement.value}
                            onChange={(e) => {
                                checkValueWithinRange(e.target);

                                const res = {
                                    type: "input",
                                    valueType: "number",
                                    value: e.target.value,
                                    uuid: props.cardElement.uuid
                                };

                                props.stateChangeMethod(res);
                            }}
                        ></input>
                    </div>
                </div>
                {props.cardElement.unitsObject && Object.keys(props.cardElement.unitsObject).length > 0 ? (
                    <>
                        <div className="my-1.5 flex flex-row justify-between px-1">
                            <div className="w-3/5">
                                <div className="pt-2 text-blue-900">
                                    Select a unit from the menu:
                                </div>
                            </div>
                            <div className="w-2/5 flex justify-around">
                                <DropdownButton
                                    className="w-full"
                                    id="dropdown-item-button"
                                    title={
                                        dropDownMenuOptionSelected.length === 0
                                            ? "Select Unit"
                                            : props.cardElement.unitsObject[
                                            dropDownMenuOptionSelected
                                            ]
                                    }
                                >
                                    {props.cardElement.unitsObject && Object.keys(props.cardElement.unitsObject).map(
                                        (keyName, index) => (
                                            <Dropdown.Item
                                                as="button"
                                                onClick={() => {
                                                    setdropDownMenuOptionSelected(keyName);
                                                }}
                                            >
                                                {props.cardElement.unitsObject[keyName]}
                                            </Dropdown.Item>
                                        )
                                    )}
                                </DropdownButton>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )}
                {/* response row */}
                {/* note row */}
                <div className="text-blue-900">
                    <span className="font-bold">NOTE:</span> Your response must range from{" "}
                    {props.cardElement.minInput} to {props.cardElement.maxInput}.
                </div>
                {/* note row */}
            </div>
        </>
    );
}

export default NumericalInputCardPreviewMode;
