import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useReducer } from "react"

function DescriptionCard(props) {
    const initialState = {
        type: props.cardElement.type,
        name: props.cardElement.name,
        uuid: props.cardElement.uuid,
        descriptionHeading: props.cardElement.descriptionHeading,
        content: props.cardElement.content,
        previewModeDisplay: props.cardElement.previewModeDisplay,
        editMode: props.cardElement.editMode,
    };

    const [state, updateDescriptionCard] = useReducer(
        handleDescriptionCardChanges,
        initialState
    );

    function handleDescriptionCardChanges(state, action) {
        switch (action.type) {
            case "HEADING":
                const updatedState_heading = {
                    type: state.type,
                    name: state.name,
                    uuid: state.uuid,
                    descriptionHeading: action.value,
                    content: state.content,
                    previewModeDisplay: state.previewModeDisplay,
                    editMode: state.editMode,
                };
                return updatedState_heading;

            case "CONTENT":
                const updatedState_content = {
                    type: state.type,
                    name: state.name,
                    uuid: state.uuid,
                    descriptionHeading: state.descriptionHeading,
                    content: action.value,
                    previewModeDisplay: state.previewModeDisplay,
                    editMode: state.editMode,
                };
                return updatedState_content;

            case "PREVIEW_MODE":
                const updatedState_preview_mode = {
                    type: state.type,
                    name: state.name,
                    uuid: state.uuid,
                    descriptionHeading: state.descriptionHeading,
                    content: state.content,
                    previewModeDisplay: !state.previewModeDisplay,
                    editMode: state.editMode,
                };
                return updatedState_preview_mode;

            case "EDIT":
                const updatedState_edit_mode = {
                    type: state.type,
                    name: state.name,
                    uuid: state.uuid,
                    descriptionHeading: state.descriptionHeading,
                    content: state.content,
                    previewModeDisplay: state.previewModeDisplay,
                    editMode: !state.editMode,
                };
                return updatedState_edit_mode;

            case "CLEAR":
                const updatedState_clear = {
                    type: state.type,
                    name: state.name,
                    uuid: state.uuid,
                    descriptionHeading: "",
                    content: "",
                    previewModeDisplay: state.previewModeDisplay,
                    editMode: state.editMode,
                };
                return updatedState_clear;
        }
    };

    // function for handling the display of the preview button
    function handlePreviewButtonDisplay(state) {
        return state.editMode ? (
            <>
                {state.previewModeDisplay ? (
                    <FontAwesomeIcon
                        icon={faEye}
                        onClick={() => updateDescriptionCard({ type: "PREVIEW_MODE" })}
                        className="text-xl my-1 cursor-pointer text-blue-900"
                        title="Preview mode enabled"
                    ></FontAwesomeIcon>
                ) : (
                    <FontAwesomeIcon
                        icon={faEyeSlash}
                        onClick={() => updateDescriptionCard({ type: "PREVIEW_MODE" })}
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
        );
    }

    // function for sending the changes of the description card to the parent component
    function saveChanges(state) {
        props.stateChangeMethod(state);
    }

    return (
        <>
            <div className="w-full border shadow-md p-4 hover:shadow-xl mb-2">
                {/* card first row */}
                <div className="flex flex-row h-9 my-2">
                    <div className="w-1/2 text-lg text-blue-900">
                        {" "}
                        {props.elementIndex} | Description Card
                    </div>
                    {/* Edit / Delete Buttons */}
                    <div className="w-1/2 flex justify-around">
                        {state.editMode ? (
                            <>
                                <div
                                    className="inline-block w-5/12 text-center border-2 my-1 border-blue-900 rounded hover:bg-blue-900 hover:text-white cursor-pointer"
                                    onClick={() => {
                                        updateDescriptionCard({ type: "CLEAR" });
                                    }}
                                >
                                    Clear
                                </div>
                                <div
                                    className="inline-block w-5/12 text-center border-2 border-blue-900 my-1 rounded hover:bg-blue-900 hover:text-white cursor-pointer"
                                    onClick={() => {
                                        updateDescriptionCard({ type: "EDIT" });
                                        saveChanges(state);
                                    }}
                                >
                                    Done
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    className="inline-block w-5/12 text-center border-2 border-blue-900 my-1 rounded hover:bg-blue-900 hover:text-white cursor-pointer"
                                    onClick={() => updateDescriptionCard({ type: "EDIT" })}
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
                                : "h-5/6 w-5/6 text-blue-900 cursor-not-allowed px-1"
                        }
                        value={state.descriptionHeading}
                        readOnly={!state.editMode}
                        placeholder="Edit Description Heading ..."
                        onChange={event =>
                            updateDescriptionCard({
                                type: "HEADING",
                                value: event.target.value,
                            })
                        }
                    />
                    {handlePreviewButtonDisplay(state)}
                </div>
                {/* card heading row */}
                {/* card textarea row */}
                <textarea
                    className={
                        state.editMode
                            ? "h-20 w-full border p-1.5 border-gray-300 rounded"
                            : "h-20 w-full border p-1.5 border-gray-300 rounded cursor-not-allowed"
                    }
                    value={state.content}
                    readOnly={!state.editMode}
                    placeholder="Write Content ..."
                    onChange={event =>
                        updateDescriptionCard({
                            type: "CONTENT",
                            value: event.target.value,
                        })
                    }
                ></textarea>
                {/* card textarea row */}
            </div>
        </>
    );
}

export default DescriptionCard;
