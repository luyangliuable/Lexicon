import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function OptionElement(props) {

    const uuid = props.optionElementuuid;

    return (
        <div className="w-full h-10 mb-1 bg-blue-100 border-1 rounded flex justify-around border-blue-900">
            {props.editModeVal ?
                (<><div className="py-0.5 w-1/12">
                    <div className=" h-full text-center pt-1 border rounded bg-blue-600 text-white">
                        {props.elementIndex}
                    </div>
                </div>
                    <input className="bg-blue-100 px-2 w-4/5" placeholder="Edit Option ..." value={props.elementValue} onChange={event => { props.editFunction(uuid, event.target.value) }} />
                    <div className="py-0.5 w-1/12">
                        <div className="h-full text-center pt-1 border rounded bg-red-600 text-white hover:bg-red-500 cursor-pointer" onClick={() => props.deleteFunction({ type: "DELETE_OPTION", value: uuid })}>
                            <FontAwesomeIcon icon={faTrashAlt} className=""></FontAwesomeIcon>
                        </div>
                    </div>
                </>) :
                (<>
                    <div className="py-0.5 w-1/12 mx-0.5 border">
                        <div className="h-full text-center pt-1 border rounded bg-blue-600 text-white">
                            {props.elementIndex}
                        </div>
                    </div>
                    <div className="w-11/12 pt-2 font-medium text-blue-900 ml-1.5 overflow-x-auto">
                        {props.elementValue}
                    </div>
                </>)}
        </div>)
}

export default OptionElement;