import React from "react";

function DescriptionCardPreviewMode(props) {
    return (<>
        <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* card heading row */}
            <div className="">
                <div className="flex font-bold text-2xl text-blue-900 h-auto inline-block break-all">
                    {props.cardElement.descriptionHeading}
                </div>
                {/* <div className=""> <FontAwesomeIcon className="text-blue-900 text-2xl" icon={faInfoCircle}></FontAwesomeIcon> </div> */}
            </div>
            {/* card heading row */}
            {/* card content area */}
            <div className="mb-1 whitespace-pre-wrap w-full">{props.cardElement.content}</div>
            {/* card content area */}
        </div>
    </>);
}

export default DescriptionCardPreviewMode;