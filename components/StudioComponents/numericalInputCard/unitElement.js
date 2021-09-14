import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function UnitElement(props) {

    const uuid = props.unitElementUUID;

    return (<> <div className="w-full h-10 mb-1 bg-blue-100 border rounded flex justify-between flex-row">
        <input className="bg-blue-100 px-2 w-2/3" placeholder="Edit Unit text (e.g. kg/s) ..." value={props.elementValue} onChange={event=>{props.editFunction(uuid, event.target.value)}} />
        <div className="flex flex-row justify-around py-0.5">
            <div className="h-full w-9 text-center pt-1 border rounded bg-blue-600 text-white">{props.elementIndex}</div>
            <div className="h-full w-9 text-center pt-1 border rounded bg-red-600 text-white mx-2 hover:bg-red-500 cursor-pointer" onClick={()=>props.deleteFunction({ type: "DELETE_UNIT", value: uuid })}><FontAwesomeIcon icon={faTrashAlt} className=""></FontAwesomeIcon></div>
        </div>
    </div></>);
}

export default UnitElement;