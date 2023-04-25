import React, { Component, useState } from "react";

function DescriptionCardPreviewMode(props) {
    return (
        <>
            <div className="transition ease-in-out duration-500 w-full border hover:shadow-xl p-8 mb-2 bg-gray-50">
                {/* card heading row */}
                <div className="">
                    <div className="flex font-bold text-2xl text-blue-900 h-auto inline-block break-all">
                        {props.cardElement.descriptionHeading}
                    </div>
                    {/* <div className=""> <FontAwesomeIcon className="text-blue-900 text-2xl" icon={faInfoCircle}></FontAwesomeIcon> </div> */}
                </div>
                {/* card heading row */}
                {/* card content area */}
                <div className="mb-1 whitespace-pre-wrap w-full">
                    {props.cardElement.content}
                </div>
                {/* card content area */}
            </div>
        </>
    );
}

export default DescriptionCardPreviewMode;
