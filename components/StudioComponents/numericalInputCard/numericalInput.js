import { faEye, faEyeSlash, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useReducer } from "react"
import { v4 as uuidv4 } from "uuid"

import UnitElement from "./unitElement"

function NumericalInputCard(props) {
  const initialState = {
    type: props.cardElement.type,
    name: props.cardElement.name,
    uuid: props.cardElement.uuid,
    questionText: props.cardElement.questionText,
    previewModeDisplay: props.cardElement.previewModeDisplay,
    minInput: props.cardElement.minInput,
    maxInput: props.cardElement.maxInput,
    unitsObject: props.cardElement.unitsObject,
    editMode: props.cardElement.editMode,
  }
  const [state, updateNumericalInputCard] = useReducer(
    handleNumericalInputCardChanges,
    initialState
  )

  function handleNumericalInputCardChanges(state, action) {
    switch (action.type) {
      case "QUESTION_TEXT":
        const updatedState_question_text = {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: action.value,
          previewModeDisplay: state.previewModeDisplay,
          minInput: state.minInput,
          maxInput: state.maxInput,
          unitsObject: state.unitsObject,
          editMode: state.editMode,
        }
        return updatedState_question_text
      case "PREVIEW_MODE":
        const updatedState_preview_mode = {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: state.questionText,
          previewModeDisplay: !state.previewModeDisplay,
          minInput: state.minInput,
          maxInput: state.maxInput,
          unitsObject: state.unitsObject,
          editMode: state.editMode,
        }
        return updatedState_preview_mode
      case "MIN_INPUT":
        const min_input_value = Number.isNaN(parseInt(action.value))
          ? action.value
          : parseInt(action.value)
        const updatedState_min_input = {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: state.questionText,
          previewModeDisplay: state.previewModeDisplay,
          minInput: min_input_value,
          maxInput: state.maxInput,
          unitsObject: state.unitsObject,
          editMode: state.editMode,
        }
        return updatedState_min_input
      case "MAX_INPUT":
        const max_input_value = Number.isNaN(parseInt(action.value))
          ? action.value
          : parseInt(action.value)
        const updatedState_max_input = {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: state.questionText,
          previewModeDisplay: state.previewModeDisplay,
          minInput: state.minInput,
          maxInput: max_input_value,
          unitsObject: state.unitsObject,
          editMode: state.editMode,
        }
        return updatedState_max_input
      case "ADD_UNIT":
        const unitElementUUID_add_unit = action.value
        state.unitsObject[unitElementUUID_add_unit] = ""
        return {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: state.questionText,
          previewModeDisplay: state.previewModeDisplay,
          minInput: state.minInput,
          maxInput: state.maxInput,
          unitsObject: state.unitsObject,
          editMode: state.editMode,
        }
      case "DELETE_UNIT":
        const unitElementUUID_delete_unit = action.value
        delete state.unitsObject[unitElementUUID_delete_unit]
        return {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: state.questionText,
          previewModeDisplay: state.previewModeDisplay,
          minInput: state.minInput,
          maxInput: state.maxInput,
          unitsObject: state.unitsObject,
          editMode: state.editMode,
        }
      case "EDIT_UNIT":
        const unitElementUUID_edit_unit = action.value
        state.unitsObject[unitElementUUID_edit_unit] = action.content
        return {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: state.questionText,
          previewModeDisplay: state.previewModeDisplay,
          minInput: state.minInput,
          maxInput: state.maxInput,
          unitsObject: state.unitsObject,
          editMode: state.editMode,
        }
      case "EDIT":
        return {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: state.questionText,
          previewModeDisplay: state.previewModeDisplay,
          minInput: state.minInput,
          maxInput: state.maxInput,
          unitsObject: state.unitsObject,
          editMode: !state.editMode,
        }
      case "CLEAR":
        return {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: "",
          previewModeDisplay: state.previewModeDisplay,
          minInput: Number.NaN,
          maxInput: Number.NaN,
          unitsObject: {},
          editMode: state.editMode,
        }
    }
  }

  function unitElementTextFunction(unitElementUUID, textContent) {
    updateNumericalInputCard({
      type: "EDIT_UNIT",
      value: unitElementUUID,
      content: textContent,
    })
  }

  // function for handling the display of the preview button
  function handlePreviewButtonDisplay(state) {
    return state.editMode ? (
      <>
        {state.previewModeDisplay ? (
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => updateNumericalInputCard({ type: "PREVIEW_MODE" })}
            className="text-xl my-1 cursor-pointer text-blue-900"
            title="Preview mode enabled"
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            icon={faEyeSlash}
            onClick={() => updateNumericalInputCard({ type: "PREVIEW_MODE" })}
            className="text-xl my-1 cursor-pointer text-blue-900"
            title="Preview mode disabled"
          ></FontAwesomeIcon>
        )}
      </>
    ) : (
      <>
        {state.previewModeDisplay ? (
          <FontAwesomeIcon
            icon={faEye}
            className="text-xl my-1 cursor-pointer text-blue-900 cursor-not-allowed"
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            icon={faEyeSlash}
            className="text-xl my-1 cursor-pointer text-blue-900 cursor-not-allowed"
          ></FontAwesomeIcon>
        )}
      </>
    )
  }

  // function for sending the changes of the description card to the parent component
  function saveChanges(state) {
    props.stateChangeMethod(state)
  }

  return (
    <>
      <div className="transition ease-in-out duration-500 w-full none:shadow hover:shadow-md border	px-2 rounded-sm text-blue-900 text-lg py-2 mb-2 select-none">
        {/* card first row */}
        <div className="flex flex-row h-9 my-2">
          <div className="w-1/2 text-lg text-blue-900">
            {" "}
            {props.elementIndex} | Numerical Input Card
          </div>
          {/* Edit / Delete Buttons */}
          <div className="w-1/2 flex justify-around">
            {state.editMode ? (
              <>
                <div
                  className="inline-block w-5/12 text-center border-2 my-1 border-blue-900 rounded hover:bg-blue-900 hover:text-white cursor-pointer"
                  onClick={() => {
                    updateNumericalInputCard({ type: "CLEAR" })
                  }}
                >
                  Clear
                </div>
                <div
                  className="inline-block w-5/12 text-center border-2 border-blue-900 my-1 rounded hover:bg-blue-900 hover:text-white cursor-pointer"
                  onClick={() => {
                    updateNumericalInputCard({ type: "EDIT" })
                    saveChanges(state)
                  }}
                >
                  Done
                </div>
              </>
            ) : (
              <>
                <div
                  className="inline-block w-5/12 text-center border-2 border-blue-900 my-1 rounded hover:bg-blue-900 hover:text-white cursor-pointer"
                  onClick={() => updateNumericalInputCard({ type: "EDIT" })}
                >
                  Edit
                </div>
                <div
                  className="inline-block w-5/12 text-center border-2 border-red-500 my-1 rounded hover:bg-red-500 hover:text-white cursor-pointer"
                  onClick={() => props.deleteMethod(state)}
                >
                  Delete
                </div>
              </>
            )}
          </div>
          {/* Edit / Delete Buttons */}
        </div>
        {/* card first row */}
        {/* card heading row */}
        <div className="h-9 w-full flex flex-row justify-between">
          <input
            className={
              state.editMode
                ? "h-5/6 w-5/6 px-1 text-blue-900"
                : "h-5/6 w-5/6 px-1 text-blue-900 cursor-not-allowed"
            }
            readOnly={!state.editMode}
            placeholder="Edit Question Text ..."
            value={state.questionText}
            onChange={event =>
              updateNumericalInputCard({
                type: "QUESTION_TEXT",
                value: event.target.value,
              })
            }
          />
          {handlePreviewButtonDisplay(state)}
        </div>
        {/* card heading row */}
        {/* min/max input row */}
        <div className="flex justify-between px-1">
          <div>
            <div className="text-blue-900">Min Input Value:</div>
            <input
              className={
                state.editMode
                  ? "border-1 border-blue-900 w-40 rounded px-1"
                  : "border-1 border-blue-900 w-40 rounded px-1 cursor-not-allowed"
              }
              readOnly={!state.editMode}
              type="number"
              placeholder="Enter min input value ..."
              value={state.minInput}
              onChange={event =>
                updateNumericalInputCard({
                  type: "MIN_INPUT",
                  value: event.target.value,
                })
              }
            />
          </div>
          <div>
            <div className="text-blue-900">Max Input Value:</div>
            <input
              className={
                state.editMode
                  ? "border-1 border-blue-900 w-40 rounded px-1"
                  : "border-1 border-blue-900 w-40 rounded px-1 cursor-not-allowed"
              }
              readOnly={!state.editMode}
              type="number"
              placeholder="Enter min input value ..."
              value={state.maxInput}
              onChange={event =>
                updateNumericalInputCard({
                  type: "MAX_INPUT",
                  value: event.target.value,
                })
              }
            />
          </div>
        </div>
        {/* min/max input row */}
        <div className="mt-2">
          {state.editMode ? (
            <div className="text-blue-900 text-sm p-1 flex justify-between">
              <span>Allowed Unit(s) Added:</span>
            </div>
          ) : (
            <>
              {Object.keys(state.unitsObject).length > 0 ? (
                <>
                  <div className="text-blue-900 text-sm p-1">
                    Unit(s) Added:{" "}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-blue-900 text-sm p-1">
                    <span className="font-bold">NOTE:</span> No units has been
                    added !
                  </div>
                </>
              )}
            </>
          )}
          {/*input row section */}
          {Object.keys(state.unitsObject).length > 0 ? (
            <div className="w-full p-1">
              {Object.keys(state.unitsObject).map((item, index) => {
                return (
                  <UnitElement
                    editModeVal={state.editMode}
                    elementValue={state.unitsObject[item]}
                    editFunction={unitElementTextFunction}
                    deleteFunction={() =>
                      updateNumericalInputCard({
                        type: "DELETE_UNIT",
                        value: item,
                      })
                    }
                    unitElementUUID={item}
                    key={index}
                    elementIndex={index}
                  ></UnitElement>
                )
              })}
            </div>
          ) : (
            <></>
          )}
          {/* input row section */}
          {state.editMode ? (
            <>
              <div className=" flex flex-row justify-between">
                <div className="text-blue-900 text-sm pt-2.5 pl-1">
                  <span className="font-bold">NOTE:</span> Adding units is
                  optional.
                </div>
                <div
                  className="bg-blue-500 py-2 px-3 text-center pt-1.5 text-white cursor-pointer hover:bg-blue-600 rounded mr-1"
                  onClick={() =>
                    updateNumericalInputCard({
                      type: "ADD_UNIT",
                      value: uuidv4(),
                    })
                  }
                >
                  <FontAwesomeIcon icon={faPlus} className=""></FontAwesomeIcon>{" "}
                  Add Units
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        {/* min/max input row */}
      </div>
    </>
  )
}

export default NumericalInputCard
