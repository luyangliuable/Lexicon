import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

function UnitElement(props) {
  const uuid = props.unitElementUUID

  // return (<> <div className="w-full h-10 mb-1 bg-blue-100 border-1 border-blue-900 rounded flex justify-between flex-row">
  //     <input className="bg-blue-100 px-2 w-2/3" placeholder="Edit Unit text (e.g. kg/s) ..." value={props.elementValue} onChange={event=>{props.editFunction(uuid, event.target.value)}} />
  //     <div className="flex flex-row justify-around py-0.5">
  //         <div className="h-full w-9 text-center pt-1 border rounded bg-blue-600 text-white">{props.elementIndex}</div>
  //         <div className="h-full w-9 text-center pt-1 border rounded bg-red-600 text-white mx-2 hover:bg-red-500 cursor-pointer" onClick={()=>props.deleteFunction({ type: "DELETE_UNIT", value: uuid })}><FontAwesomeIcon icon={faTrashAlt} className=""></FontAwesomeIcon></div>
  //     </div>
  // </div></>);

  return (
    <div className="w-full h-10 mb-1 bg-blue-100 border-1 rounded flex justify-around border-blue-900">
      {props.editModeVal ? (
        <>
          <div className="py-0.5 w-1/12">
            <div className=" h-full text-center pt-1 border rounded bg-blue-600 text-white">
              {props.elementIndex}
            </div>
          </div>
          <input
            className="bg-blue-100 px-2 w-4/5"
            placeholder="Edit Option ..."
            value={props.elementValue}
            onChange={event => {
              props.editFunction(uuid, event.target.value)
            }}
          />
          <div className="py-0.5 w-1/12">
            <div
              className="h-full text-center pt-1 border rounded bg-red-600 text-white hover:bg-red-500 cursor-pointer"
              onClick={() =>
                props.deleteFunction({ type: "DELETE_UNIT", value: uuid })
              }
            >
              <FontAwesomeIcon icon={faTrashAlt} className=""></FontAwesomeIcon>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="py-0.5 w-1/12 mx-0.5">
            <div className="h-full text-center pt-1 border rounded bg-blue-600 text-white">
              {props.elementIndex}
            </div>
          </div>
          <div className="w-11/12 pt-2 font-medium text-blue-900 ml-1.5">
            {props.elementValue}
          </div>
        </>
      )}
    </div>
  )
}

export default UnitElement
