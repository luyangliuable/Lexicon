import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function OptionElement(props) {

    const uuid = props.optionElementuuid;

    return (<>
        {props.editModeVal ? (<>
            <div className="w-full h-10 mb-1 bg-blue-100 border-1 border-blue-900 rounded flex justify-between flex-row">
                <div className="inline-flex w-full">
                    <span className="py-0.5"><div className="h-full w-9 text-center pt-1 border rounded bg-blue-600 text-white ml-0.5">{props.elementIndex}</div></span>
                    <input className="bg-blue-100 px-2 w-4/5 ml-1" placeholder="Edit Option ..." value={props.optionElementText} onChange={event => { props.editOptionTextFunction(uuid, event.target.value) }} />
                </div>
                <div className="flex flex-row justify-around py-0.5">
                    <input className="bg-white w-3/5 h-5/6 p-2 text-xs p-0.5 border-1 rounded border-blue-900 mt-1" placeholder="Score ..." min="1" type="number" value={props.optionElementScore} onKeyDown={event => { event.preventDefault() }} onChange={event => { props.editOptionScoreFunction(uuid, event.target.value) }} />
                    <div className="h-full w-9 text-center pt-1 border rounded bg-red-600 text-white mx-1 hover:bg-red-500 cursor-pointer" onClick={() => props.deleteOptionFunction({ type: "DELETE_OPTION", value: uuid })}><FontAwesomeIcon icon={faTrashAlt} className=""></FontAwesomeIcon></div>
                </div>
            </div>
        </>) : 
        (<>
        <div className="w-full h-10 mb-1 bg-blue-100 border-1 border-blue-900 rounded flex justify-between flex-row">
            <div className="inline-flex w-full">
                <span className="py-0.5"><div className="h-full w-9 text-center pt-1 border rounded bg-blue-600 text-white ml-0.5">{props.elementIndex}</div></span>
                <input className="bg-blue-100 px-2 w-4/5 ml-1 cursor-not-allowed text-blue-900 font-medium	" placeholder="Edit Option ..." readOnly={true} value={props.optionElementText} onChange={event => { props.editOptionTextFunction(uuid, event.target.value) }} />
            </div>
            <div className="flex flex-row justify-end py-0.5">
                <input className="bg-white w-3/5 h-5/6 p-2 text-xs p-0.5 border-1 rounded border-blue-900 mt-1 mr-2 cursor-not-allowed" readOnly={true} placeholder="Score ..." min="1" type="number" value={props.optionElementScore} onKeyDown={event => { event.preventDefault() }} onChange={event => { props.editOptionScoreFunction(uuid, event.target.value) }} />
            </div>
        </div>
        </>)}
    </>)
}

export default OptionElement;