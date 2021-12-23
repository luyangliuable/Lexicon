import React from "react";

function NumericalOutputCardPreviewMode(props) {
    return (<>
        <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* card heading row */}
            <div className="flex flex-row mb-1 mb-0">
                <div className="inline-block font-bold text-2xl w-full text-blue-900 break-all">{props.cardElement.outputHeading}</div>
            </div>
            {/* card heading row */}
            {/* card content area */}
            <div className="mb-1">{props.cardElement.outputDescription}</div>
            {/* card content area */}
            {/* card result area */}
            <div className="flex text-blue-900 font-semibold border-1 py-0.5 px-2 rounded justify-between border-blue-900">
                <div>Result:</div>
                <div>{props.cardElement.totalScore}</div>
            </div>
            {/* card result area */}
        </div>
    </>)
}

export default NumericalOutputCardPreviewMode;