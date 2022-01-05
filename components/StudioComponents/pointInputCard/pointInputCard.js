import { faEye, faEyeSlash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer, useState } from "react";
import OptionElement from "./optionElement";
import { v4 as uuidv4 } from 'uuid';
import Switch from "react-switch";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

function PointInputCard(props) {

    const initialState = {
        type: props.cardElement.type,
        name: props.cardElement.name,
        uuid: props.cardElement.uuid,
        questionText: props.cardElement.questionText,
        previewModeDisplay: props.cardElement.previewModeDisplay,
        optionsObject: props.cardElement.optionsObject,
        editMode: props.cardElement.editMode,
        maxSelectionVal: props.cardElement.maxSelectionVal,
        outputAssociation: props.cardElement.outputAssociation,
        outputAssociationElement: props.cardElement.outputAssociationElement
    };

    const [state, updateOptionsObject] = useReducer(handleoptionsObjectChanges, initialState);
    const [existingCardDialogBoxState, setExistingCardDialogBoxState] = useState(false);
    const [existingCardDialogBoxSelectionState, setExistingCardDialogBoxSelectionState] = useState(null);

    // function for handling the changes in the options array
    function handleoptionsObjectChanges(state, action) {
        const optionElementUUID = action.value;
        switch (action.type) {
            case "QUESTION_TEXT":
                const updatedState_question_text = { type: state.type, name: state.name, uuid: state.uuid, questionText: action.value, previewModeDisplay: state.previewModeDisplay, optionsObject: state.optionsObject, editMode: state.editMode, maxSelectionVal: state.maxSelectionVal, outputAssociation: state.outputAssociation, outputAssociationElement: state.outputAssociationElement };
                return updatedState_question_text;
            case "PREVIEW_MODE":
                const updatedState_preview_mode = { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: !state.previewModeDisplay, optionsObject: state.optionsObject, editMode: state.editMode, maxSelectionVal: state.maxSelectionVal, outputAssociation: state.outputAssociation, outputAssociationElement: state.outputAssociationElement };
                return updatedState_preview_mode;
            case "ADD_OPTION":
                state.optionsObject[optionElementUUID] = { optionText: '', optionScore: 0 };
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, optionsObject: state.optionsObject, editMode: state.editMode, maxSelectionVal: state.maxSelectionVal, outputAssociation: state.outputAssociation, outputAssociationElement: state.outputAssociationElement };
            case "EDIT_OPTION_TEXT":
                state.optionsObject[optionElementUUID].optionText = action.content;
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, optionsObject: state.optionsObject, editMode: state.editMode, maxSelectionVal: state.maxSelectionVal, outputAssociation: state.outputAssociation, outputAssociationElement: state.outputAssociationElement };
            case "EDIT_OPTION_SCORE":
                state.optionsObject[optionElementUUID].optionScore = Number.isNaN(parseInt(action.content)) ? 1 : parseInt(action.content);
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, optionsObject: state.optionsObject, editMode: state.editMode, maxSelectionVal: state.maxSelectionVal, outputAssociation: state.outputAssociation, outputAssociationElement: state.outputAssociationElement };
            case "DELETE_OPTION":
                delete state.optionsObject[optionElementUUID];
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, optionsObject: state.optionsObject, editMode: state.editMode, maxSelectionVal: state.maxSelectionVal, outputAssociation: state.outputAssociation, outputAssociationElement: state.outputAssociationElement };
            case "EDIT":
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, optionsObject: state.optionsObject, editMode: !state.editMode, maxSelectionVal: state.maxSelectionVal, outputAssociation: state.outputAssociation, outputAssociationElement: state.outputAssociationElement };
            case "MAX_SELECTIONS":
                const max_selection_new_value = action.value;
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, optionsObject: state.optionsObject, editMode: state.editMode, maxSelectionVal: max_selection_new_value, outputAssociation: state.outputAssociation, outputAssociationElement: state.outputAssociationElement };
            case "OUTPUT_ASSOCIATION":
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, optionsObject: state.optionsObject, editMode: state.editMode, maxSelectionVal: state.maxSelectionVal, outputAssociation: !state.outputAssociation, outputAssociationElement: null };
            case "OUTPUT_ASSOCIATION_ELEMENT":
                return { type: state.type, name: state.name, uuid: state.uuid, questionText: state.questionText, previewModeDisplay: state.previewModeDisplay, optionsObject: state.optionsObject, editMode: state.editMode, maxSelectionVal: state.maxSelectionVal, outputAssociation: state.outputAssociation, outputAssociationElement: action.value };

        }
    }

    // function for performing the necessary task for output association
    function outputAssociationHelper(actionType, cardUUID) {
        if (actionType === "NEW") {
            if (state.outputAssociationElement === null || state.outputAssociationElement.type === "EXISTING") {
                const elementUUID = cardUUID;
                props.outputAssociation('output', 'NumericalOutputComponent', elementUUID);
            } else {
                alert("Point Input Card: An output card has already been added for output association !");
            }
        } else if (actionType === "EXISTING") {
            if (props.outputsListCopy.length > 0) {
                setExistingCardDialogBoxState(true);
            } else {
                alert("Point Input Card: There are no existing numerical output cards to select from !");
            }
        }
    }

    // function for updating the text of the option
    function editOptionElementTextFunction(optionElementUUID, textContent) {
        updateOptionsObject({ type: "EDIT_OPTION_TEXT", value: optionElementUUID, content: textContent });
    }

    // function for updating the score of the option
    function editOptionElementScoreFunction(optionElementUUID, optionScore) {
        updateOptionsObject({ type: "EDIT_OPTION_SCORE", value: optionElementUUID, content: optionScore })
    }

    // function for sending the changes of the description card to the parent component
    function saveChanges(state) {
        props.stateChangeMethod(state);
    }

    // function for handling the display of the preview button
    function handlePreviewButtonDisplay(state) {
        return state.editMode ?
            (<>
                {state.previewModeDisplay ?
                    (<FontAwesomeIcon icon={faEye} onClick={() => updateOptionsObject({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900" title="Preview mode enabled"></FontAwesomeIcon>) :
                    (<FontAwesomeIcon icon={faEyeSlash} onClick={() => updateOptionsObject({ type: "PREVIEW_MODE" })} className="text-xl my-1 cursor-pointer text-blue-900" title="Preview mode disabled"></FontAwesomeIcon>)
                }
            </>)
            :
            (<>
                {state.previewModeDisplay ?
                    (<FontAwesomeIcon icon={faEye} className="text-xl my-1 cursor-pointer text-blue-900 cursor-not-allowed"></FontAwesomeIcon>) :
                    (<FontAwesomeIcon icon={faEyeSlash} className="text-xl my-1 cursor-pointer text-blue-900 cursor-not-allowed"></FontAwesomeIcon>)
                }
            </>)
    }

    return (<>

        {/* Card Delete Confirmation */}
        <Modal show={existingCardDialogBoxState} onHide={() => { setExistingCardDialogBoxState(false); }} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title className="text-blue-900">Card Output Association</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-blue-900">
                {console.log(props.outputsListCopy)}
                <div>Select a numerical output card for the association of output: </div>
                <div className="mt-2">
                    <DropdownButton className="w-full" id="dropdown-item-button" title={existingCardDialogBoxSelectionState ? existingCardDialogBoxSelectionState.display : "Select Element "}>
                        {props.outputsListCopy.map((currentItem) => (
                            <Dropdown.Item as="button" onClick={() => {
                                setExistingCardDialogBoxSelectionState({ uuid: currentItem.uuid, display: currentItem.outputHeading });
                            }}>
                                {currentItem.outputHeading}
                            </Dropdown.Item>))}
                    </DropdownButton>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => { setExistingCardDialogBoxState(false) }}>
                    Cancel
                </Button>
                <Button variant="success" onClick={() => {
                    updateOptionsObject({ type: "OUTPUT_ASSOCIATION_ELEMENT", value: { type: "EXISTING", uuid: existingCardDialogBoxSelectionState.uuid, display: existingCardDialogBoxSelectionState.display } });
                    setExistingCardDialogBoxState(false);
                }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
        {/* Card Delete Confirmation */}

        <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* card first row */}
            <div className="flex flex-row h-9 my-2">
                <div className="w-1/2 text-lg text-blue-900"> {props.elementIndex} | Point Input Card</div>
                {/* Edit / Delete Buttons */}
                <div className="w-1/2 flex justify-around">
                    {state.editMode ?
                        (<>
                            <div className="inline-block w-5/12 text-center border-2 my-1 border-transparent rounded"></div>
                            <div className="inline-block w-5/12 text-center border-2 border-blue-900 my-1 rounded hover:bg-blue-900 hover:text-white cursor-pointer" onClick={() => { updateOptionsObject({ type: "EDIT" }); saveChanges(state) }}>Done</div>
                        </>)
                        :
                        (<>
                            <div className="inline-block w-5/12 text-center border-2 border-blue-900 my-1 rounded hover:bg-blue-900 hover:text-white cursor-pointer" onClick={() => updateOptionsObject({ type: "EDIT" })}>Edit</div>
                            <div className="inline-block w-5/12 text-center border-2 border-red-500 my-1 rounded hover:bg-red-500 hover:text-white cursor-pointer" onClick={() => props.deleteMethod(state)}>Delete</div>
                        </>)}
                </div>
                {/* Edit / Delete Buttons */}
            </div>
            {/* card first row */}
            {/* card heading row */}
            <div className="h-9 w-full flex flex-row justify-between">
                <input className={state.editMode ? "h-5/6 w-11/12 px-1 text-blue-900" : "h-5/6 w-11/12 px-1 text-blue-900 cursor-not-allowed"} readOnly={!state.editMode} placeholder="Edit Question Text ..." value={state.questionText} onChange={event => updateOptionsObject({ type: "QUESTION_TEXT", value: event.target.value })} />
                {handlePreviewButtonDisplay(state)}
            </div>
            {/* card heading row */}
            <div className="">
                {state.editMode ? (<div className="text-blue-900 text-sm p-1">Options Added:</div>) :
                    (<>
                        {Object.keys(state.optionsObject).length > 0 ? (<div className="text-sm text-blue-900">Options Added:</div>) : (<div className="text-blue-900 text-sm"><span className="font-bold">NOTE:</span> No options has been added.</div>)}
                    </>)}
                {/*input row section */}
                <div className="w-full p-1">
                    {Object.keys(state.optionsObject).map((item, index) => {
                        return <OptionElement optionElementText={state.optionsObject[item].optionText}
                            optionElementScore={state.optionsObject[item].optionScore}
                            editOptionTextFunction={editOptionElementTextFunction}
                            editOptionScoreFunction={editOptionElementScoreFunction}
                            deleteOptionFunction={() => updateOptionsObject({ type: "DELETE_OPTION", value: item })}
                            optionElementuuid={item}
                            elementIndex={index}
                            editModeVal={state.editMode}
                            key={index}></OptionElement>
                    })}
                </div>
                {/* input row section */}
                {state.editMode ?
                    (<>
                        <div className=" flex flex-row justify-end mb-1.5 justify-between">
                            <div>
                                <div className="text-blue-900 text-xs">Max options users can select:</div>
                                <input className="border-1 rounded px-1 w-32 border-blue-900 h-6 w-32 text-sm" type="number" min="1" value={state.maxSelectionVal} readOnly={!state.editMode} onKeyDown={event => { event.preventDefault() }} onChange={event => updateOptionsObject({ type: "MAX_SELECTIONS", value: event.target.value })} ></input>
                            </div>
                            <div className="bg-blue-500 p-2 text-center text-white cursor-pointer hover:bg-blue-600 rounded mr-1" onClick={() => updateOptionsObject({ type: "ADD_OPTION", value: uuidv4() })}>
                                <FontAwesomeIcon icon={faPlus} className=""></FontAwesomeIcon> Add Option
                            </div>
                        </div>
                        <div className="flex justify-between text-base px-0.5">
                            <div className="mt-1.5 text-blue-900">Card Output Association: </div>
                            <div className="mt-0.5">
                                <Switch
                                    onChange={() => {
                                        updateOptionsObject({ type: "OUTPUT_ASSOCIATION" });
                                        setExistingCardDialogBoxSelectionState(null);
                                    }}
                                    checked={state.outputAssociation}
                                    offColor="#326ced"
                                    onColor="#326ced"
                                    className="text-sm"
                                />
                            </div>
                        </div>
                        {state.outputAssociation && (
                            <div className="flex justify-between px-0.5 mb-1">
                                <div className="text-blue-900 pt-2.5 ">Associate card output with:</div>
                                <div className="">
                                    <DropdownButton className="w-full" id="dropdown-item-button" title={state.outputAssociationElement ? state.outputAssociationElement.display : "Select Element "}>
                                        <Dropdown.Item as="button" onClick={() => {
                                            const elementUUID = uuidv4();
                                            updateOptionsObject({ type: "OUTPUT_ASSOCIATION_ELEMENT", value: { type: "NEW", uuid: elementUUID, display: "New Card" } });
                                            outputAssociationHelper("NEW", elementUUID);
                                        }}>New Card</Dropdown.Item>
                                        {/* Display the option of selecting from the existing card only if there are any numerical output card to choose from*/}
                                        {props.outputsListCopy.length > 0 &&
                                            (<Dropdown.Item as="button" onClick={() => {
                                                outputAssociationHelper("EXISTING");
                                            }}>Existing Card</Dropdown.Item>)}
                                    </DropdownButton>
                                </div>
                            </div>
                        )}
                        <div className="text-blue-900 text-sm mt-1.5">
                            <div><span className="font-bold">NOTE:</span> The card output can be associated with only one of the output category cards.</div>
                            <div className="mt-1" ><span className="font-bold">NOTE:</span> A score must be provided for each option and it must be greater than or equal to 0. The default value for the maximum number of option(s) that the users can select is 1 and this value must be greater than 0.</div>
                        </div>
                    </>) : (<></>)}
            </div>
        </div>
    </>)
}

export default PointInputCard;