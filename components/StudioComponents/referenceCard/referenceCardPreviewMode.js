import React from "react";

function ReferenceCardPreviewMode(props) {
    return (<div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
        {/* card heading row */}
        <div className="flex flex-row">
            <div className="inline-block font-bold text-2xl w-full text-blue-900 break-all">{props.cardElement.referenceName}</div>
        </div>
        {/* card heading row */}
        {/* card link area */}
        <div className="">
            <span className="font-medium mr-1">Link:</span>
            <a className="underline text-blue-500 break-all" href={`//${props.cardElement.url_link}`} target="_blank">{props.cardElement.url_link}</a>
        </div>
        {/* card link area */}
    </div>)
}

export default ReferenceCardPreviewMode;