import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useReducer } from "react"

function SliderInputCard(props) {
  const initialState = {
    type: props.cardElement.type,
    name: props.cardElement.name,
    uuid: props.cardElement.uuid,
    questionText: props.cardElement.questionText,
    previewModeDisplay: props.cardElement.previewModeDisplay,
    minInput: props.cardElement.minInput,
    maxInput: props.cardElement.maxInput,
    stepInterval: props.cardElement.stepInterval,
    editMode: props.cardElement.editMode,
  }
  const [state, updateSliderInputCard] = useReducer(
    handleSliderInputCardChanges,
    initialState
  )

  function handleSliderInputCardChanges(state, action) {
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
          stepInterval: state.stepInterval,
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
          stepInterval: state.stepInterval,
          editMode: state.editMode,
        }
        return updatedState_preview_mode
      case "MIN_INPUT":
        const min_input_val = Number.isNaN(parseInt(action.value))
          ? action.value
          : parseInt(action.value)
        const updatedState_min_input = {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: state.questionText,
          previewModeDisplay: state.previewModeDisplay,
          minInput: min_input_val,
          maxInput: state.maxInput,
          stepInterval: state.stepInterval,
          editMode: state.editMode,
        }
        return updatedState_min_input
      case "STEP_INTERVAL":
        const step_interval_val = Number.isNaN(parseInt(action.value))
          ? 0
          : parseInt(action.value)
        const updatedState_step_interval = {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: state.questionText,
          previewModeDisplay: state.previewModeDisplay,
          minInput: state.minInput,
          maxInput: state.maxInput,
          stepInterval: step_interval_val,
          editMode: state.editMode,
        }
        return updatedState_step_interval
      case "MAX_INPUT":
        const max_input_val = Number.isNaN(parseInt(action.value))
          ? action.value
          : parseInt(action.value)
        const updatedState_max_input = {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: state.questionText,
          previewModeDisplay: state.previewModeDisplay,
          minInput: state.minInput,
          maxInput: max_input_val,
          stepInterval: state.stepInterval,
          editMode: state.editMode,
        }
        return updatedState_max_input
      case "EDIT":
        const updatedState_edit_mode = {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: state.questionText,
          previewModeDisplay: state.previewModeDisplay,
          minInput: state.minInput,
          maxInput: state.maxInput,
          stepInterval: state.stepInterval,
          editMode: !state.editMode,
        }
        return updatedState_edit_mode
      case "CLEAR":
        const updatedState_clear = {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          previewModeDisplay: state.previewModeDisplay,
          questionText: "",
          minInput: Number.NaN,
          maxInput: Number.NaN,
          stepInterval: 0,
          editMode: state.editMode,
        }
        return updatedState_clear
    }
  }

  // function for handling the display of the preview button
  function handlePreviewButtonDisplay(state) {
    return state.editMode ? (
      <>
        {state.previewModeDisplay ? (
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => updateSliderInputCard({ type: "PREVIEW_MODE" })}
            className="text-xl my-1 cursor-pointer text-blue-900"
            title="Preview mode enabled"
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            icon={faEyeSlash}
            onClick={() => updateSliderInputCard({ type: "PREVIEW_MODE" })}
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
        {/* Card First Row */}
        <div className="flex flex-row h-9 my-2">
          <div className="w-1/2 text-lg text-blue-900">
            {" "}
            {props.elementIndex} | Slider Input Card
          </div>
          {/* Edit / Delete Buttons */}
          <div className="w-1/2 flex justify-around">
            {state.editMode ? (
              <>
                <div
                  className="inline-block w-5/12 text-center border-2 my-1 border-blue-900 rounded hover:bg-blue-900 hover:text-white cursor-pointer"
                  onClick={() => {
                    updateSliderInputCard({ type: "CLEAR" })
                  }}
                >
                  Clear
                </div>
                <div
                  className="inline-block w-5/12 text-center border-2 border-blue-900 my-1 rounded hover:bg-blue-900 hover:text-white cursor-pointer"
                  onClick={() => {
                    updateSliderInputCard({ type: "EDIT" })
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
                  onClick={() => updateSliderInputCard({ type: "EDIT" })}
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
        {/* Card First Row */}
        {/* card heading row */}
        <div className="h-9 w-full flex flex-row justify-between">
          <input
            className={
              state.editMode
                ? "h-5/6 w-5/6 px-1 text-blue-900"
                : "h-5/6 w-5/6 px-1 text-blue-900 cursor-not-allowed"
            }
            placeholder="Edit Question Text ..."
            readOnly={!state.editMode}
            value={state.questionText}
            onChange={event =>
              updateSliderInputCard({
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
            <div className="text-blue-900 ">Min Input:</div>
            <input
              className={
                state.editMode
                  ? "border-1 w-11/12 rounded px-1 border-blue-900"
                  : "border-1 w-11/12 rounded px-1 border-blue-900 cursor-not-allowed"
              }
              type="number"
              readOnly={!state.editMode}
              placeholder="Enter min value"
              value={state.minInput}
              onChange={event =>
                updateSliderInputCard({
                  type: "MIN_INPUT",
                  value: event.target.value,
                })
              }
            />
          </div>
          <div>
            <div className="text-blue-900">Step Interval:</div>
            <input
              className={
                state.editMode
                  ? "border-1 w-11/12 rounded px-1 border-blue-900"
                  : "border-1 w-11/12 rounded px-1 border-blue-900 cursor-not-allowed"
              }
              type="number"
              readOnly={!state.editMode}
              min="0"
              value={state.stepInterval}
              onChange={event =>
                updateSliderInputCard({
                  type: "STEP_INTERVAL",
                  value: event.target.value,
                })
              }
            />
          </div>
          <div>
            <div className="text-blue-900">Max Input:</div>
            <input
              className={
                state.editMode
                  ? "border-1 w-11/12 rounded px-1 border-blue-900"
                  : "border-1 w-11/12 rounded px-1 border-blue-900 cursor-not-allowed"
              }
              type="number"
              readOnly={!state.editMode}
              placeholder="Enter max value"
              value={state.maxInput}
              onChange={event =>
                updateSliderInputCard({
                  type: "MAX_INPUT",
                  value: event.target.value,
                })
              }
            />
          </div>
        </div>
        {/* min/max input row */}
        {/* step interval value */}
        {state.editMode ? (
          <div className="text-blue-900 text-sm p-1 pt-2">
            <span className="font-bold">NOTE:</span> The default value for step
            interval is 0 and it must be greater than or equal to 0.
          </div>
        ) : (
          <></>
        )}
        {/* step interval value */}
      </div>
    </>
  )
}

export default SliderInputCard
