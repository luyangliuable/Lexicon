import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ReferenceCardPreviewMode(props) {
    return (<div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
        {/* card heading row */}
        <div className="flex flex-row h-9">
        <div className="inline-block font-black text-2xl w-full text-blue-900">{props.cardElement.referenceName}</div>
        </div>
        {/* card heading row */}
        {/* card link area */}
        <div className="underline"><a href={props.cardElement.url_link} target="_blank">{props.cardElement.url_link}</a></div>
        {/* card link area */}
    </div>)
}

export default ReferenceCardPreviewMode;