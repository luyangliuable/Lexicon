import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useReducer } from "react"

function BivalentInputCard(props) {
  const initialState = {
    type: props.cardElement.type,
    name: props.cardElement.name,
    uuid: props.cardElement.uuid,
    questionText: props.cardElement.questionText,
    previewModeDisplay: props.cardElement.previewModeDisplay,
    editMode: props.cardElement.editMode,
  }
  const [state, updateBivalentInputCard] = useReducer(
    handleBivalentInputCardChanges,
    initialState
  )

  function handleBivalentInputCardChanges(state, action) {
    switch (action.type) {
      case "QUESTION_TEXT":
        const updatedState_question_text = {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: action.value,
          previewModeDisplay: state.previewModeDisplay,
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
          editMode: state.editMode,
        }
        return updatedState_preview_mode
      case "EDIT":
        const updatedState_edit_mode = {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: state.questionText,
          previewModeDisplay: state.previewModeDisplay,
          editMode: !state.editMode,
        }
        return updatedState_edit_mode
      case "CLEAR":
        const updatedState_clear = {
          type: state.type,
          name: state.name,
          uuid: state.uuid,
          questionText: "",
          previewModeDisplay: state.previewModeDisplay,
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
            onClick={() => updateBivalentInputCard({ type: "PREVIEW_MODE" })}
            className="text-xl my-1 cursor-pointer text-blue-900"
            title="Preview mode enabled"
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            icon={faEyeSlash}
            onClick={() => updateBivalentInputCard({ type: "PREVIEW_MODE" })}
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
      <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
        {/* Card First Row */}
        <div className="flex flex-row h-9 my-2">
          <div className="w-1/2 text-lg text-blue-900">
            {" "}
            {props.elementIndex} | Bivalent Input Card
          </div>
          {/* Edit / Delete Buttons */}
          <div className="w-1/2 flex justify-around">
            {state.editMode ? (
              <>
                <div
                  className="inline-block w-5/12 text-center border-2 my-1 border-blue-900 rounded hover:bg-blue-900 hover:text-white cursor-pointer"
                  onClick={() => {
                    updateBivalentInputCard({ type: "CLEAR" })
                  }}
                >
                  Clear
                </div>
                <div
                  className="inline-block w-5/12 text-center border-2 border-blue-900 my-1 rounded hover:bg-blue-900 hover:text-white cursor-pointer"
                  onClick={() => {
                    updateBivalentInputCard({ type: "EDIT" })
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
                  onClick={() => updateBivalentInputCard({ type: "EDIT" })}
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
        {/* Card Second Row */}
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
              updateBivalentInputCard({
                type: "QUESTION_TEXT",
                value: event.target.value,
              })
            }
          />
          {handlePreviewButtonDisplay(state)}
        </div>
        {/* Card Second Row */}
      </div>
    </>
  )
}

export default BivalentInputCard
