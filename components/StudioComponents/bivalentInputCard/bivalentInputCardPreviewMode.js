import React, { useState, useReducer, useEffect } from "react";

function BivalentInputCardPreviewMode(props) {

    function responseButtonStyling(response, callingButton) {
        const notSelected =
              "inline-block w-5/12 text-center text-white bg-blue-900 pt-0.5 cursor-pointer text-xl hover:shadow-xl border border-transparent hover:bg-blue-600 rounded";
        const selected =
              "inline-block w-5/12 text-center text-white bg-blue-600 pt-0.5 cursor-pointer text-xl hover:shadow-xl border border-transparent hover:bg-blue-600 rounded";
        switch (callingButton) {
        case "YES":
            switch (response) {
            case true:
                return selected;
                break;
            case false:
                return notSelected;
                break;
            default:
                return notSelected;
                break;
            }
        case "NO":
            switch (response) {
            case true:
                return notSelected;
                break;
            case false:
                return selected;
                break;
            default:
                return notSelected;
                break;
            }
        }
    };


    function noButtonStyling(response) {}
    // const [response, recordResponse] = useState(null);


    const reducer = (state, action) => {

        const res = {
            type: "input",
            valueType: "number",
            value: action.selection,
            uuid: props.cardElement.uuid
        };

        props.stateChangeMethod(res);

        // props.cardElement.value = action.selection;
        return action.selection;
    };

    const [response, recordResponse] = useReducer(reducer, {selection: null});

    useEffect(() => {
        // console.log(response);
    }, [response]);

    return (
        <>
          <div className="transition ease-in-out duration-500 w-full none:shadow hover:shadow-md border	px-2 rounded-sm text-blue-900 text-lg py-2 mb-2 select-none">
            {/* question row */}
            <div className="inline-block font-semibold text-xl w-full text-blue-900 break-all">
              {props.cardElement.questionText}
            </div>
            {/* question row */}
            {/* response row */}
            <div className="w-full flex justify-around h-8 my-2.5">
              <div
                className={
                    responseButtonStyling(response, "YES")
                }
                onClick={() => recordResponse({selection: true })}
              >
                {" "}
                Yes{" "}
              </div>
              <div
                className={responseButtonStyling(response, "NO")}
                onClick={() => recordResponse({selection: false })}
              >
                {" "}
                No{" "}
              </div>
            </div>
            {/* response row */}
          </div>
        </>
    );
}

export default BivalentInputCardPreviewMode;
