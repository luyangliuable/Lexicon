import { faEllipsisV, faEye, faEyeSlash, faFileExport, faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Modal, Button, Toast, ToastContainer } from "react-bootstrap";
import React, { Component } from "react";
import DecriptionCardComponent from "./../../components/StudioComponents/descriptionCard/descriptionCard";
import NumericalOutputCard from "../../components/StudioComponents/numericalOutputCard/numericalOutputCard";
import ReferenceCard from "../../components/StudioComponents/referenceCard/referenceCard";
import NumericalInputCard from "../../components/StudioComponents/numericalInputCard/numericalInput";
import SelectInputCard from "../../components/StudioComponents/selectInputCard/selectInputCard";
import { v4 as uuidv4 } from 'uuid';
import BivalentInputCard from "../../components/StudioComponents/bivalentInputCard/bivalentInputCard";
import SliderInputCard from "../../components/StudioComponents/sliderInputCard/sliderInputCard";
import PointInputCard from "../../components/StudioComponents/pointInputCard/pointInputCard";
import DescriptionCardPreviewMode from "../../components/StudioComponents/descriptionCard/descriptionCardPreviewMode";
import ReferenceCardPreviewMode from "../../components/StudioComponents/referenceCard/referenceCardPreviewMode";
import NumericalOutputCardPreviewMode from "../../components/StudioComponents/numericalOutputCard/numericalOutputCardPreviewMode";
import BivalentInputCardPreviewMode from "../../components/StudioComponents/bivalentInputCard/bivalentInputCardPreviewMode";
import SliderInputCardPreviewMode from "../../components/StudioComponents/sliderInputCard/sliderInputCardPreviewMode";
import SelectInputCardPreviewMode from "../../components/StudioComponents/selectInputCard/selectInputCardPreviewMode";
import NumericalInputCardPreviewMode from "../../components/StudioComponents/numericalInputCard/numericalInputCardPreviewMode";
import PointInputCardPreviewMode from "../../components/StudioComponents/pointInputCard/pointInputCardPreviewMode";

class studioMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSideBarMenu: false,
            metaList: [],
            inputsList: [],
            outputsList: [],
            previewMode: false,
            cardDeleteConfirmation: false,
            cardDeleteModalDisplay: false,
            objectToBeDeleted: null,
            totalInputScore: 0,
            displayTotalInputScore: false,
            displayCardAdditionToast: false
        }
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleCardDelete = this.handleCardDelete.bind(this);
        this.toggleSideBarMenu = this.toggleSideBarMenu.bind(this);
        this.togglePreviewMode = this.togglePreviewMode.bind(this);
        this.sideBarOptionSelected = this.sideBarOptionSelected.bind(this);
        this.captureCardComponentStateChange = this.captureCardComponentStateChange.bind(this);
        this.handleCardComponentDelete = this.handleCardComponentDelete.bind(this);
        this.conditionalCardRender = this.conditionalCardRender.bind(this);
        this.deleteAssistFunction = this.deleteAssistFunction.bind(this);
        this.updateInputCardTotalScore = this.updateInputCardTotalScore.bind(this);
        this.updateNumericalOutputCardTotalScore = this.updateNumericalOutputCardTotalScore.bind(this);
    }

    // method for updating the total score for input cards
    updateNumericalOutputCardTotalScore(optionScore, operationString, cardUUID) {
        const numericalOutputCardToBeUpdatedIndex = this.state.outputsList.findIndex(currentItem => currentItem.uuid === cardUUID);
        this.setState(prevState => {
            let outputsListLocalCopy = prevState.outputsList;
            switch (operationString) {
                case 'ADD':
                    outputsListLocalCopy[numericalOutputCardToBeUpdatedIndex].totalScore += optionScore;
                    break;
                case 'SUBTRACT':
                    outputsListLocalCopy[numericalOutputCardToBeUpdatedIndex].totalScore -= optionScore;
                    break;
            }
            return { outputsList: outputsListLocalCopy };
        })
    }

    // method for updating the total score for input cards
    updateInputCardTotalScore(optionScore, operationString) {
        switch (operationString) {
            case 'ADD':
                const updatedScore_add = this.state.totalInputScore + optionScore;
                this.setState({ totalInputScore: updatedScore_add });
                break;
            case 'SUBTRACT':
                const updatedScore_subtract = this.state.totalInputScore - optionScore;
                this.setState({ totalInputScore: updatedScore_subtract });
                break;
        }
    }

    // method for handling the opening and the closure of the side bar menu
    toggleSideBarMenu() {
        if (!this.state.previewMode) {
            if (this.state.showSideBarMenu) {
                this.setState({ showSideBarMenu: false })
            } else {
                this.setState({ showSideBarMenu: true })
            }
        } else {
            alert("Cards cannot be added or edited in a preview mode !");
        }
    }

    // method for toggling the preview mode
    togglePreviewMode() {
        if (!this.state.previewMode && this.performCardCheckForPreviewMode()) {
            this.setState(prevState => {
                let outputListLocalCopy = prevState.outputsList;
                // resetting the numerical output card total score
                if (outputListLocalCopy.length > 0) {
                    const outputListModified = outputListLocalCopy.map(currentItem => {
                        currentItem.totalScore = 0;
                        return currentItem;
                    });
                    return { outputsList: outputListModified, previewMode: true, totalInputScore: 0 };
                } else {
                    return { previewMode: true, totalInputScore: 0 };
                }
            });
        }
        else { this.setState({ previewMode: false }); }
    }

    // method when one of the side bar options has been selected 
    sideBarOptionSelected = (elementType, elementName, elementUUID) => {
        const componentType = elementType;
        const componentName = elementName;
        const componentUUID = elementUUID ? elementUUID : uuidv4();
        const componentElement = { type: componentType, name: componentName, uuid: componentUUID };

        switch (componentElement.type) {
            // meta list type element
            case 'meta':
                switch (componentElement.name) {

                    // Description Card
                    case 'DescriptionComponent':
                        componentElement.descriptionHeading = '';
                        componentElement.content = '';
                        componentElement.previewModeDisplay = true;
                        componentElement.editMode = false;
                        this.setState({ metaList: [...this.state.metaList, componentElement], displayCardAdditionToast: true});
                        break;

                    // Reference Card
                    case 'ReferenceComponent':
                        componentElement.referenceName = '';
                        componentElement.url_link = '';
                        componentElement.previewModeDisplay = true;
                        componentElement.editMode = false;
                        this.setState({ metaList: [...this.state.metaList, componentElement], displayCardAdditionToast: true });
                        break;
                }
                break;

            // input list type element
            case 'input':
                switch (componentElement.name) {

                    // Bivalent Input Card
                    case 'BivalentInput':
                        componentElement.questionText = '';
                        componentElement.previewModeDisplay = true;
                        componentElement.editMode = false;
                        this.setState({ inputsList: [...this.state.inputsList, componentElement], displayCardAdditionToast: true });
                        break;

                    // Slider Input Card
                    case 'SliderInput':
                        componentElement.questionText = '';
                        componentElement.minInput = Number.NaN;
                        componentElement.stepInterval = 0;
                        componentElement.maxInput = Number.NaN;
                        componentElement.previewModeDisplay = true;
                        componentElement.editMode = false;
                        this.setState({ inputsList: [...this.state.inputsList, componentElement], displayCardAdditionToast: true });
                        break;

                    // Select Input Card
                    case 'SelectInput':
                        componentElement.questionText = '';
                        componentElement.previewModeDisplay = true;
                        componentElement.maxSelectionVal = 1;
                        componentElement.optionsObject = {};
                        componentElement.editMode = false;
                        this.setState({ inputsList: [...this.state.inputsList, componentElement], displayCardAdditionToast: true });
                        break;

                    // Numerical Input Card
                    case 'NumericalInput':
                        componentElement.questionText = '';
                        componentElement.previewModeDisplay = true;
                        componentElement.minInput = Number.NaN;
                        componentElement.maxInput = Number.NaN;
                        componentElement.unitsObject = {};
                        componentElement.editMode = false;
                        this.setState({ inputsList: [...this.state.inputsList, componentElement], displayCardAdditionToast: true });
                        break;

                    // Point Input Card
                    case 'PointInput':
                        componentElement.questionText = '';
                        componentElement.previewModeDisplay = true;
                        componentElement.optionsObject = {};
                        componentElement.editMode = false;
                        componentElement.maxSelectionVal = 1;
                        componentElement.outputAssociation = false;
                        componentElement.outputAssociationElement = null;
                        this.setState({ inputsList: [...this.state.inputsList, componentElement], displayCardAdditionToast: true });
                        break;
                }
                break;

            // output list type element
            case 'output':
                switch (componentElement.name) {
                    case 'NumericalOutputComponent':
                        componentElement.outputHeading = '';
                        componentElement.previewModeDisplay = true;
                        componentElement.outputDescription = '';
                        componentElement.editMode = false;
                        componentElement.totalScore = 0;
                        this.setState({ outputsList: [...this.state.outputsList, componentElement] });
                        break;
                }
                break;
        }
    }

    // method for capturing the state changes in the card components
    captureCardComponentStateChange(stateObject) {
        switch (stateObject.type) {
            case "meta":
                const stateObjectToBeUpdatedIndex_m = this.state.metaList.findIndex(item => item.uuid == stateObject.uuid);
                switch (stateObject.name) {
                    case 'DescriptionComponent':
                        this.setState(prevState => {
                            let metaListLocalCopy = prevState.metaList;
                            metaListLocalCopy[stateObjectToBeUpdatedIndex_m].descriptionHeading = stateObject.descriptionHeading;
                            metaListLocalCopy[stateObjectToBeUpdatedIndex_m].content = stateObject.content;
                            metaListLocalCopy[stateObjectToBeUpdatedIndex_m].previewModeDisplay = stateObject.previewModeDisplay;
                            return { metaList: metaListLocalCopy };
                        });
                        break;

                    case 'ReferenceComponent':
                        this.setState(prevState => {
                            let metaListLocalCopy = prevState.metaList;
                            metaListLocalCopy[stateObjectToBeUpdatedIndex_m].referenceName = stateObject.referenceName;
                            metaListLocalCopy[stateObjectToBeUpdatedIndex_m].url_link = stateObject.url_link;
                            metaListLocalCopy[stateObjectToBeUpdatedIndex_m].previewModeDisplay = stateObject.previewModeDisplay;
                            return { metaList: metaListLocalCopy };
                        });
                        break;
                }
            case 'input':
                const stateObjectToBeUpdatedIndex_i = this.state.inputsList.findIndex(item => item.uuid == stateObject.uuid);
                switch (stateObject.name) {
                    case 'BivalentInput':
                        this.setState(prevState => {
                            let inputListLocalCopy = prevState.inputsList;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].questionText = stateObject.questionText;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].previewModeDisplay = stateObject.previewModeDisplay;
                            return { inputsList: inputListLocalCopy };
                        });
                        break;

                    case 'SliderInput':
                        this.setState(prevState => {
                            let inputListLocalCopy = prevState.inputsList;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].questionText = stateObject.questionText;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].minInput = stateObject.minInput;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].stepInterval = stateObject.stepInterval;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].maxInput = stateObject.maxInput;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].previewModeDisplay = stateObject.previewModeDisplay;
                            return { inputsList: inputListLocalCopy };
                        });
                        break;

                    case 'SelectInput':
                        this.setState(prevState => {
                            let inputListLocalCopy = prevState.inputsList;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].questionText = stateObject.questionText;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].previewModeDisplay = stateObject.previewModeDisplay;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].maxSelectionVal = stateObject.maxSelectionVal;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].optionsObject = stateObject.optionsObject;
                            return { inputsList: inputListLocalCopy };
                        });
                        break;

                    case 'NumericalInput':
                        this.setState(prevState => {
                            let inputListLocalCopy = prevState.inputsList;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].questionText = stateObject.questionText;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].previewModeDisplay = stateObject.previewModeDisplay;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].minInput = stateObject.minInput;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].maxInput = stateObject.maxInput;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].unitsObject = stateObject.unitsObject;
                            return { inputsList: inputListLocalCopy };
                        });
                        break;

                    case 'PointInput':
                        this.setState(prevState => {
                            let inputListLocalCopy = prevState.inputsList;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].questionText = stateObject.questionText;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].previewModeDisplay = stateObject.previewModeDisplay;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].optionsObject = stateObject.optionsObject;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].maxSelectionVal = stateObject.maxSelectionVal;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].outputAssociation = stateObject.outputAssociation;
                            inputListLocalCopy[stateObjectToBeUpdatedIndex_i].outputAssociationElement = stateObject.outputAssociationElement;
                            return { inputsList: inputListLocalCopy };
                        });
                        break;
                }
            case 'output':
                const stateObjectToBeUpdatedIndex_o = this.state.outputsList.findIndex(item => item.uuid == stateObject.uuid);
                switch (stateObject.name) {
                    case 'NumericalOutputComponent':
                        this.setState(prevState => {
                            let outputListLocalCopy = prevState.outputsList;
                            outputListLocalCopy[stateObjectToBeUpdatedIndex_o].outputHeading = stateObject.outputHeading;
                            outputListLocalCopy[stateObjectToBeUpdatedIndex_o].outputDescription = stateObject.outputDescription;
                            outputListLocalCopy[stateObjectToBeUpdatedIndex_o].previewModeDisplay = stateObject.previewModeDisplay;
                            outputListLocalCopy[stateObjectToBeUpdatedIndex_o].totalScore = stateObject.totalScore;
                            return { outputsList: outputListLocalCopy };
                        });
                        break;
                }
        }
    }

    // method that performs a check against those cards whose preview mode is enabled
    performCardCheckForPreviewMode() {

        // check for cards in the meta list
        const metaListLocalCopy = this.state.metaList;
        for (let index_m = 0; index_m < metaListLocalCopy.length; index_m++) {
            const current_card_m = metaListLocalCopy[index_m];
            if (!current_card_m.previewModeDisplay) { continue; } // skipping those cards whose preivew mode is disabled
            switch (current_card_m.name) {

                case 'DescriptionComponent':

                    // CHECK: Card heading has been provided.
                    if (current_card_m.descriptionHeading.length === 0) {
                        alert('Description Card: Please provide the description heading !');
                        return false;
                    }

                    // CHECK: Card content has been provided.
                    if (current_card_m.content.length === 0) {
                        alert('Description Card: Please provide the description content !');
                        return false;
                    }

                    break;

                case 'ReferenceComponent':

                    // CHECK: Card heading has been provided.
                    if (current_card_m.referenceName.length === 0) {
                        alert('Reference Card: Please provide the reference link name !');
                        return false;
                    }

                    // CHECK: URL Link has been provided.
                    if (current_card_m.url_link.length === 0) {
                        alert('Reference Card: Please provide the reference link !');
                        return false;
                    }

                    break;
            }
        }
        // check for cards in inputs list
        const inputListLocalCopy = this.state.inputsList;
        for (let index_i = 0; index_i < inputListLocalCopy.length; index_i++) {
            const current_card_i = inputListLocalCopy[index_i];
            if (!current_card_i.previewModeDisplay) { continue; } // skipping those cards whose preivew mode is disabled
            switch (current_card_i.name) {

                case 'BivalentInput':

                    // CHECK: Card question has been provided.
                    if (current_card_i.questionText.length === 0) {
                        alert('Bivalent Input Card: Please enter the question !');
                        return false;
                    }

                    break;

                case 'SliderInput':

                    // CHECK: Card question has been provided.
                    if (current_card_i.questionText.length === 0) {
                        alert('Slider Input Card: Please enter the question !');
                        return false;
                    }

                    // CHECK: Slider min-input value has been provided.
                    if (Number.isNaN(current_card_i.minInput)) {
                        alert('Slider Input Card: Please provide the min value for the slider !');
                        return false;
                    }

                    // CHECK: Slider max-input value has been provided.
                    if (Number.isNaN(current_card_i.maxInput)) {
                        alert('Slider Input Card: Please provide the max value for the slider !');
                        return false;
                    }

                    // CHECK: Slider step interval value has been provided.
                    if (Number.isNaN(current_card_i.stepInterval)) {
                        alert('Slider Input Card: Please provide the step interval value for the slider !');
                        return false
                    }

                    // CHECK: Slider min-input value is less than the max-input value.
                    if (current_card_i.minInput >= current_card_i.maxInput) {
                        alert('Slider Input Card: Min value for the slider cannot be greater than or equal to the max value !');
                        return false;
                    }

                    // CHECK: Slider max-input value is greater than the min-input value.
                    if (current_card_i.maxInput <= current_card_i.minInput) {
                        alert('Slider Input Card: Max value for the slider cannot be less than or equal to the min value !');
                        return false;
                    }

                    // CHECK: If step interval value is greater than 0, then the slider range can be divided into equal parts as
                    // the step interval value.
                    if ((current_card_i.stepInterval > 0) && ((current_card_i.maxInput % current_card_i.stepInterval) != 0)) {
                        alert('Slider Input Card: Please enter a valid value for the step interval !');
                        return false;
                    }

                    break;

                case 'SelectInput':

                    // CHECK: Card question has been provided.
                    if (current_card_i.questionText.length === 0) {
                        alert('Select Input Card: Please provide the question !');
                        return false;
                    }

                    // CHECK: Options has been provided.
                    if (Object.keys(current_card_i.optionsObject).length === 0) {
                        alert('Select Input Card: Please add some options for the user to select !');
                        return false;
                    }

                    // CHECK: Max selection value is less than or equal to the number of options provided.
                    if (current_card_i.maxSelectionVal > Object.keys(current_card_i.optionsObject).length) {
                        alert('Select Input Card: Max selection value cannot be greater than the number of options provided !');
                        return false;
                    }

                    // CHECK: Content for provided options is non-empty.
                    if (Object.keys(current_card_i.optionsObject).length > 0) {
                        for (const [key, value] of Object.entries(current_card_i.optionsObject)) {
                            if (value.length === 0) {
                                alert('Select Input Card: No provided option can be empty !');
                                return false;
                            }
                        }
                        break;
                    }

                    // CHECK: Max selection value is greater than 0.
                    if (current_card_i.maxSelectionVal < 1) {
                        alert('Select Input Card: Max selection value must greater than or equal to 1 !');
                        return false;
                    }

                    break;

                case 'NumericalInput':

                    // CHECK: Card question has been provided.
                    if (current_card_i.questionText.length === 0) {
                        alert('Numerical Input Card: Please provide the question !');
                        return false;
                    }

                    // CHECK: Min input value has been provided.
                    if (Number.isNaN(current_card_i.minInput)) {
                        alert('Numerical Input Card: Please provide the min value !');
                        return false;
                    }

                    // CHECK: Max input value has been provided.
                    if (Number.isNaN(current_card_i.maxInput)) {
                        alert('Numerical Input Card: Please provide the max value !');
                        return false;
                    }

                    // CHECK: Min input value is less than the max input value.
                    if (current_card_i.minInput >= current_card_i.maxInput) {
                        alert('Numerical Input Card: Min value cannot be greater than or equal to the max value !');
                        return false;
                    }

                    // CHECK: Max input value is greater than the min input value.
                    if (current_card_i.maxInput <= current_card_i.minInput) {
                        alert('Numerical Input Card: Max value cannot be less than or equal to min value');
                        return false;
                    }

                    // CHECK: Content for the provided options is non-empty.
                    if (Object.keys(current_card_i.unitsObject).length > 0) {
                        for (const [key, value] of Object.entries(current_card_i.unitsObject)) {
                            if (value.length === 0) {
                                alert('Numerical Input Card: No provided unit option can be empty !');
                                return false;
                            }
                        }
                    }

                    break;

                case 'PointInput':

                    // CHECK: Card question has been provided.
                    if (current_card_i.questionText.length === 0) {
                        alert('Point Input Card: Please provide the question !');
                        return false;
                    }

                    // CHECK: Options has been provided.
                    if (Object.keys(current_card_i.optionsObject).length === 0) {
                        alert('Point Input Card: Please add some options for the user to select !');
                        return false;
                    }

                    // CHECK: Content for the provided options is non-empty and their score is non-negative.
                    if (Object.keys(current_card_i.optionsObject).length > 0) {
                        for (const [keyName, value] of Object.entries(current_card_i.optionsObject)) {
                            const currentOptionObj = current_card_i.optionsObject[keyName];
                            if (currentOptionObj.optionText.length === 0) {
                                alert('Point Input Card: No provided option can be empty !');
                                return false;
                            } else if (!Number.isInteger(currentOptionObj.optionScore)) {
                                alert('Point Input Card: No provided option can have a score less than 0 !');
                                return false;
                            }
                        }
                    }

                    // CHECK: Max selection value is greater than 0.
                    if (current_card_i.maxSelectionVal < 1) {
                        alert('Point Input Card: Max selection value must greater than or equal to 1 !');
                        return false;
                    }

                    // CHECK: Max selection value is less than or equal to the number of options provided.
                    if (current_card_i.maxSelectionVal > Object.keys(current_card_i.optionsObject).length) {
                        alert('Point Input Card: Max selection value cannot be greater than the number of options provided !');
                        return false;
                    }

                    // CHECK: If output associations has been selected, then some element for output association has been provided.
                    if (current_card_i.outputAssociation && (current_card_i.outputAssociationElement === null)) {
                        alert('Point Input Card: No element selected for output association !');
                        return false;
                    }
                    break;


            }
        }

        // check for cards in outputs list
        const outputListLocalCopy = this.state.outputsList;
        for (let index_o = 0; index_o < outputListLocalCopy.length; index_o++) {
            const current_card_o = outputListLocalCopy[index_o];
            if (!current_card_o.previewModeDisplay) { continue; } // skipping those cards whose preivew mode is disabled
            switch (current_card_o.name) {

                case 'NumericalOutputComponent':

                    // CHECK: Heading has been provided.
                    if (current_card_o.outputHeading.length === 0) {
                        alert('Numerical Output Card: Please provide the output heading !');
                        return false;
                    }

                    // CHECK: Description has been provided.
                    if (current_card_o.outputDescription.length === 0) {
                        alert('Numerical Output Card: Please provide the output description !');
                        return false;
                    }

                    break;
            }
        }
        return true;
    }

    // function for triggering the closure of the card delete modal
    handleModalClose() {
        this.setState({ cardDeleteModalDisplay: false, objectToBeDeleted: null });
    }

    // function for triggering the opening of the card delete modal
    handleCardDelete() {
        this.setState({ cardDeleteModalDisplay: false }, () => { this.deleteAssistFunction() });
    }

    // method for conditionally rendering card components
    conditionalCardRender(cardItem, index) {
        switch (this.state.previewMode) {
            // if preview mode is disabled
            case false:
                switch (cardItem.name) {
                    case "SelectInput":
                        return (<SelectInputCard cardElement={cardItem} deleteMethod={this.handleCardComponentDelete} stateChangeMethod={this.captureCardComponentStateChange} elementIndex={index} key={cardItem.uuid}></SelectInputCard>);
                    case "NumericalInput":
                        return (<NumericalInputCard cardElement={cardItem} deleteMethod={this.handleCardComponentDelete} stateChangeMethod={this.captureCardComponentStateChange} elementIndex={index} key={cardItem.uuid}></NumericalInputCard>);
                    case "BivalentInput":
                        return (<BivalentInputCard cardElement={cardItem} deleteMethod={this.handleCardComponentDelete} stateChangeMethod={this.captureCardComponentStateChange} elementIndex={index} key={cardItem.uuid}></BivalentInputCard>);
                    case "SliderInput":
                        return (<SliderInputCard cardElement={cardItem} deleteMethod={this.handleCardComponentDelete} stateChangeMethod={this.captureCardComponentStateChange} elementIndex={index} key={cardItem.uuid}></SliderInputCard>);
                    case "PointInput":
                        return (<PointInputCard cardElement={cardItem} deleteMethod={this.handleCardComponentDelete} stateChangeMethod={this.captureCardComponentStateChange} elementIndex={index} key={cardItem.uuid} outputAssociation={this.sideBarOptionSelected} outputsListCopy={this.state.outputsList}></PointInputCard>);
                    case "DescriptionComponent":
                        return (<DecriptionCardComponent cardElement={cardItem} deleteMethod={this.handleCardComponentDelete} stateChangeMethod={this.captureCardComponentStateChange} elementIndex={index} key={cardItem.uuid}></DecriptionCardComponent>);
                    case "ReferenceComponent":
                        return (<ReferenceCard cardElement={cardItem} deleteMethod={this.handleCardComponentDelete} stateChangeMethod={this.captureCardComponentStateChange} elementIndex={index} key={cardItem.uuid}></ReferenceCard>);
                    case "NumericalOutputComponent":
                        return (<NumericalOutputCard cardElement={cardItem} deleteMethod={this.handleCardComponentDelete} stateChangeMethod={this.captureCardComponentStateChange} elementIndex={index} key={cardItem.uuid}></NumericalOutputCard>);
                }
            // if preview mode is enabled
            case true:
                switch (cardItem.name) {
                    case "SelectInput":
                        return (cardItem.previewModeDisplay ? (<SelectInputCardPreviewMode cardElement={cardItem} elementIndex={index} key={cardItem.uuid}></SelectInputCardPreviewMode>) : (<></>))
                    case "NumericalInput":
                        return (cardItem.previewModeDisplay ? (<NumericalInputCardPreviewMode cardElement={cardItem} elementIndex={index} key={cardItem.uuid}></NumericalInputCardPreviewMode>) : (<></>));
                    case "BivalentInput":
                        return (cardItem.previewModeDisplay ? (<BivalentInputCardPreviewMode cardElement={cardItem} elementIndex={index} key={cardItem.uuid}></BivalentInputCardPreviewMode>) : (<></>));
                    case "SliderInput":
                        return (cardItem.previewModeDisplay ? (<SliderInputCardPreviewMode cardElement={cardItem} elementIndex={index} key={cardItem.uuid}></SliderInputCardPreviewMode>) : (<></>));
                    case "PointInput":
                        { !this.state.displayTotalInputScore ? this.setState({ displayTotalInputScore: true }) : null };
                        return (cardItem.previewModeDisplay ? (<PointInputCardPreviewMode inputCardtotalScoreUpdateMethod={this.updateNumericalOutputCardTotalScore} cardElement={cardItem} elementIndex={index} key={cardItem.uuid}></PointInputCardPreviewMode>) : (<></>));
                    case "DescriptionComponent":
                        return (cardItem.previewModeDisplay ? (<DescriptionCardPreviewMode cardElement={cardItem} elementIndex={index} key={cardItem.uuid}></DescriptionCardPreviewMode>) : (<></>));
                    case "ReferenceComponent":
                        return (cardItem.previewModeDisplay ? (<ReferenceCardPreviewMode cardElement={cardItem} elementIndex={index} key={cardItem.uuid}></ReferenceCardPreviewMode>) : (<></>));
                    case "NumericalOutputComponent":
                        return (cardItem.previewModeDisplay ? (<NumericalOutputCardPreviewMode cardElement={cardItem} elementIndex={index} key={cardItem.uuid}></NumericalOutputCardPreviewMode>) : (<></>));
                }
        }
    }

    // method for handling the delete action of a card component
    handleCardComponentDelete(stateObject) {
        this.setState({ cardDeleteModalDisplay: true, objectToBeDeleted: stateObject })
    }

    // method for performing the deletion of a card once the user presses 
    // delete button in the dialog box ( delete confirmation modal )
    deleteAssistFunction() {
        const objectToBeDeletedUUID = this.state.objectToBeDeleted.uuid;
        switch (this.state.objectToBeDeleted.type) {
            case 'meta':
                let updatedMetaList = this.state.metaList.filter(item => item.uuid != objectToBeDeletedUUID);
                this.setState({ metaList: updatedMetaList, cardDeleteConfirmation: false });
                break;
            case 'input':
                let updatedInputList = this.state.inputsList.filter(item => item.uuid != objectToBeDeletedUUID);
                this.setState({ inputsList: updatedInputList, cardDeleteConfirmation: false });
                break;
            case 'output':
                let updatedOutputList = this.state.outputsList.filter(item => item.uuid != objectToBeDeletedUUID);
                this.setState({ outputsList: updatedOutputList, cardDeleteConfirmation: false });
                break;
        }
    }

    render() {
        return (<>

            <ToastContainer position='bottom-end' className="m-4">
            <Toast onClose={() => this.setState({displayCardAdditionToast: false})} show={this.state.displayCardAdditionToast} delay={5000} autohide>
            <Toast.Header>
                <strong className="me-auto text-blue-900">Alert</strong>
            </Toast.Header>
                <Toast.Body className="text-blue-900">The selected card has been added to dashboard !</Toast.Body>
            </Toast>
            </ToastContainer>

            {/* Card Delete Confirmation */}
            <Modal show={this.state.cardDeleteModalDisplay} onHide={this.handleModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-blue-900">Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-blue-900">Are you sure you want to delete the selected card ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleModalClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={this.handleCardDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Card Delete Confirmation */}

            <div className="w-100vw min-h-screen">
                {/* side bar menu for card components */}
                <Offcanvas show={this.state.showSideBarMenu} onHide={this.toggleSideBarMenu}>
                    <Offcanvas.Header closeButton>
                        <div className="text-4xl text-blue-900">Components</div>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="divide-y divide-gray-300">
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900" onClick={() => { this.sideBarOptionSelected('meta', 'DescriptionComponent') }}>Description Card</div>
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900" onClick={() => { this.sideBarOptionSelected('meta', 'ReferenceComponent') }}>Reference Card</div>
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900" onClick={() => { this.sideBarOptionSelected('input', 'SelectInput') }}>Select Input Card</div>
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900" onClick={() => { this.sideBarOptionSelected('input', 'NumericalInput') }}>Numerical Input Card</div>
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900" onClick={() => { this.sideBarOptionSelected('input', 'BivalentInput') }} >Bivalent Input Card</div>
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900" onClick={() => { this.sideBarOptionSelected('input', 'SliderInput') }}>Slider Input Card</div>
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900" onClick={() => { this.sideBarOptionSelected('input', 'PointInput') }}>Point Input Card</div>
                        {/* <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900" onClick={() => { this.sideBarOptionSelected('output', 'NumericalOutputComponent') }}>Numerical Output Card</div> */}
                    </Offcanvas.Body>
                </Offcanvas>
                {/* side bar menu for card components */}
                {/* studio navbar */}
                <div className="w-screen p-1 flex justify-between items-center">
                    <div className="text-3xl text-blue-900 m-1 inline-block font-semibold">Lexicon Studio</div>
                    <div className="flex items-center">
                        <div className="text-blue-900 text-lg mr-2 px-1.5 py-1 cursor-pointer border-b-2 border-transparent hover:border-blue-900" onClick={this.toggleSideBarMenu}>
                            <FontAwesomeIcon icon={faPlusCircle} className="mr-1.5" />Create
                        </div>
                        <div className="text-blue-900 text-lg mr-2 px-1.5 py-1 cursor-pointer border-b-2 border-transparent hover:border-blue-900" onClick={this.togglePreviewMode}>
                            {this.state.previewMode ? (<><FontAwesomeIcon icon={faEyeSlash} className="mr-1.5" />Disable Preview Mode</>) : (<><FontAwesomeIcon icon={faEye} className="mr-1.5" />Enable Preview Mode</>)}
                        </div>
                        <div className="text-blue-900 text-lg mr-2 px-1.5 py-1 cursor-pointer border-b-2 border-transparent hover:border-blue-900">
                            <FontAwesomeIcon icon={faFileExport} className="mr-1.5" />Save
                        </div>
                    </div>
                </div>
                {/* studio navbar */}
                {/* card display section */}
                <div className="flex flex-row">
                    {/* meta column */}
                    <div className="w-1/3 mx-2">
                        <div className="w-full mb-2 shadow-md border px-2 rounded-md text-blue-900 text-lg h-9 pt-1">
                            <FontAwesomeIcon icon={faEllipsisV} className="mr-2" />Meta
                        </div>
                        {this.state.metaList.map((item, index) => (this.conditionalCardRender(item, index)))}
                    </div>
                    {/* meta column */}
                    {/* inputs column */}
                    <div className="w-1/3 mx-2">
                        <div className="w-full mb-2 shadow-md border px-2 rounded-md text-blue-900 text-lg h-9 pt-1">
                            <FontAwesomeIcon icon={faEllipsisV} className="mr-2" />Inputs
                        </div>
                        {this.state.inputsList.map((item, index) => (this.conditionalCardRender(item, index)))}
                        {/* points card total score */}
                        {/* {(this.state.displayTotalInputScore && this.state.previewMode) ?
                            (<>
                                <div className="flex justify-between p-1 mb-2 text-xl border-2 px-2 rounded-lg border-blue-900">
                                    <div className="text-blue-900 font-normal">Result:</div>
                                    <div className="text-blue-900">{this.state.totalInputScore}</div>
                                </div>
                            </>)
                            : (<></>)} */}
                        {/* points card total score */}
                    </div>
                    {/* input column */}
                    {/* outputs column */}
                    <div className="w-1/3 mx-2">
                        <div className="w-full mb-2 shadow-md border px-2 rounded-md text-blue-900 text-lg h-9 pt-1">
                            <FontAwesomeIcon icon={faEllipsisV} className="mr-2" />Outputs
                        </div>
                        {this.state.outputsList.map((item, index) => (this.conditionalCardRender(item, index)))}
                    </div>
                    {/* outputs column */}
                </div>
                {/* card display section */}
            </div>
        </>)
    }
}

export default studioMain;