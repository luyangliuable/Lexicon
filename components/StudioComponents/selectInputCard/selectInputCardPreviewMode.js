import React, { useState } from "react"

function SelectInputCardPreviewMode(props) {
  const [optionsSelectedArray, setOptionsSelectedArray] = useState([])

  // function for updating the options selected array
  function updateOptionsSelectedArray(
    optionSelectedUUID,
    optionsSelectedArrayCopy,
    MaxOptionsUsersCanSelect
  ) {
    if (optionsSelectedArrayCopy.includes(optionSelectedUUID)) {
      setOptionsSelectedArray(oldArray =>
        oldArray.filter(item => item != optionSelectedUUID)
      )
    } else if (optionsSelectedArrayCopy.length === MaxOptionsUsersCanSelect) {
      setOptionsSelectedArray(oldArray => {
        oldArray.shift()
        return [...oldArray, optionSelectedUUID]
      })
    } else {
      setOptionsSelectedArray(oldArray => [...oldArray, optionSelectedUUID])
    }
  }

  // function for adding styling the options as per the user selection
  function updateOptionsStyling(optionSelectedUUID, optionsSelectedArray) {
    if (optionsSelectedArray.includes(optionSelectedUUID)) {
      return "w-full h-9 mb-1 bg-blue-200 border-1 border-blue-900 rounded flex flex-row cursor-pointer hover:bg-blue-200 hover:border-blue-900"
    } else {
      return "w-full h-9 mb-1 bg-blue-100 border-1 border-blue-400 rounded flex flex-row cursor-pointer hover:bg-blue-200 hover:border-blue-900"
    }
  }

  return (
    <>
      <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
        {/* question row */}
        <div className="min-h-full font-semibold text-lg text-blue-900 mb-2 break-all">
          {props.cardElement.questionText}
        </div>
        {/* question row */}
        {/* options row */}
        {Object.keys(props.cardElement.optionsObject).map((keyName, index) => (
          <div
            className={updateOptionsStyling(keyName, optionsSelectedArray)}
            onClick={() =>
              updateOptionsSelectedArray(
                keyName,
                optionsSelectedArray,
                props.cardElement.maxSelectionVal
              )
            }
            key={keyName}
          >
            <div className="flex flex-row justify-around py-0.5 mx-0.5">
              <div className="h-full w-9 text-center pt-0.5 border rounded bg-blue-600 text-white">
                {index}
              </div>
            </div>
            <div className="font-bold mx-2 mt-1 text-lg text-blue-800 overflow-x-scroll">
              {props.cardElement.optionsObject[keyName]}
            </div>
          </div>
        ))}
        {/* options row */}
        {/* note row */}
        <div className="text-blue-900 text-sm mt-2">
          <b>NOTE:</b> You can only select {props.cardElement.maxSelectionVal}{" "}
          option(s).
        </div>
        {/* note row */}
      </div>
    </>
  )
}

export default SelectInputCardPreviewMode
