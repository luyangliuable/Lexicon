import React, { useState } from "react";
import RangeSlider from "react-bootstrap-range-slider";

function SliderInputCardPreviewMode(props) {
    const [value, setValue] = useState(0);

    return (
        <>
            <div className="transition ease-in-out duration-500 w-full none:shadow hover:shadow-md border	px-2 rounded-sm text-blue-900 text-lg py-2 mb-2 select-none bg-gray-50">
                {/* question row */}
                <div className="inline-block font-semibold text-xl w-full text-blue-900 break-all">
                    {props.cardElement.questionText}
                </div>
                {/* question row */}
                {/* slider row */}
                <div className="w-full flex mt-2">
                    <div className="w-full inline-block">
                        <RangeSlider
                            className="w-full cursor-pointer"
                            min={props.cardElement.minInput}
                            tooltip="off"
                            max={props.cardElement.maxInput}
                            step={props.cardElement.stepInterval}
                            value={value}
                            onChange={(changeEvent) => {
                                setValue(changeEvent.target.value);

                                const res = {
                                    type: "input",
                                    valueType: "number",
                                    value: changeEvent.target.value,
                                    uuid: props.cardElement.uuid
                                };

                                props.stateChangeMethod(res);
                            }}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <span className="text-blue-900 ">
                        {" "}
                        <span className="font-bold">Min:</span> {props.cardElement.minInput}
                    </span>
                    <span className="text-blue-900 ">
                        {" "}
                        <span className="font-bold">Max:</span> {props.cardElement.maxInput}
                    </span>
                </div>
                <div className="text-blue-900 text-base">
                    <div>
                        Value Selected:
                        <div className="border-2 border-blue-800 text-blue-900 rounded-md bg-blue-50 ml-2 text-center w-14 h-6 text-sm inline-block">
                            {value}
                        </div>
                    </div>
                </div>
                {/* slider row */}
            </div>
        </>
    );
}

export default SliderInputCardPreviewMode
