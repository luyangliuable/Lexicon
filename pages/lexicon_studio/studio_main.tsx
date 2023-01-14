import { faEllipsisV, faEye, faEyeSlash, faFileExport, faPlusCircle, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Modal, Button, Toast, ToastContainer } from "react-bootstrap";
import React, { Component } from "react";
import { createForm, fetchFormNameAndID, deleteForm, fetchForm } from "./api_lexicon_studio.tsx"; // TODO how to import this normally?
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
import studioMainState from "./interface/studioMainInterface";


class studioMain extends Component<{}, studioMainState> {

    constructor(props) {
        super(props);
        this.state = {
            showSideBarMenu: false,
            metaList: [],
            inputsList: [],
            outputsList: [],
            previewMode: false,
            formulaValues: {},
            cardDeleteConfirmation: false,
            cardDeleteModalDisplay: false,
            objectToBeDeleted: null,
            totalInputScore: 0,
            displayTotalInputScore: false,
            displayCardAdditionToast: false,
            viewSavedFormsMenu: false,
            savedFormsList: [],
            saveFormDialogBoxOptions: { display: false, formName: '', name_requirement_warning: false },
            error: { occurence: false, message: '' },
            viewSavedFormsDialogBox: {
                display: false,
                viewSelectedForm: false,
                deleteSelectedForm: false,
                selectedFormDetails: { UUID: '', name: '' }
            }
        };
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
        this.handleSaveFormOption = this.handleSaveFormOption.bind(this);
        this.handleSaveFormOptionConfirmation = this.handleSaveFormOptionConfirmation.bind(this);
        this.handleViewSavedFormSelectionRequest = this.handleViewSavedFormSelectionRequest.bind(this);
        this.deleteSavedFormRequest = this.deleteSavedFormRequest.bind(this);
        this.fetchSavedForm = this.fetchSavedForm.bind(this);
        this.capturePreviewFieldStateChange = this.capturePreviewFieldStateChange.bind(this);
    }

    componentDidMount() {
        document.getElementsByClassName("navbar-option")[1].style.background = "#00bfff";
        document.getElementsByClassName("navbar-option")[1].style.color = "#FFF";

    }

    componentDidUpdate(prevProps, prevState) {

        // For some reason when the props (new inputs are added) the child elements does not update its state with new props.
        for (let output of this.state.outputsList) {
            output.availableVariables = this.state.inputsList;
        }
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
        });
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
    toggleSideBarMenu(callingEntity) {
        switch(callingEntity){
            case "CREATE-CARD-OPTION":
                if (!this.state.previewMode) {
                    if (this.state.showSideBarMenu) {
                        this.setState({ showSideBarMenu: false });
                    } else {
                        this.setState({ showSideBarMenu: true });
                    }
                } else {
                    alert("Cards cannot be added or edited in a preview mode !");
                }
                break;
            case "VIEW-SAVED-FORMS-OPTION":
                if (this.state.viewSavedFormsMenu){
                    this.setState({ viewSavedFormsMenu: false });
                } else {
                    this.setState({ viewSavedFormsMenu: true });
                    fetchFormNameAndID().then(data => {
                        if (data.error) {
                            alert('There was an error in processing your request. Please try again later !');
                        } else {
                            this.setState({ savedFormsList: data.output });
                        }
                    });
                }
                break;
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

        type componentElement = {
            type: any,
            name: string,
            uuid: string,
            descriptionHeading?: string,
            content?: string,
            optionsObject?: any,
            unitsObject?: any,
            totalScore?: number,
            outputassociationelement?: any,
            formula?: string,
            outputDescription?: string,
            outputHeading?: string,
            availableVariables: string[],
            outputAssociation?: boolean,
            editMode?: boolean
            url_link?: string,
            previewModeDisplay?: boolean,
            referenceName?: string,
            questionText?: string,
            maxSelectionVal?: number
            maxInput?: number,
            minInput?: number,
            stepInterval?: number,
            value?: number
        }

        const componentElement: componentElement = {
            type: componentType,
            name: componentName,
            uuid: componentUUID
        };

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
                        componentElement.value = Number.NaN;
                        this.setState({ inputsList: [...this.state.inputsList, componentElement], displayCardAdditionToast: true });
                        break;

                        // Slider Input Card
                    case 'SliderInput':
                        componentElement.questionText = '';
                        componentElement.minInput = Number.NaN;
                        componentElement.value = Number.NaN;
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
                        componentElement.value = Number.NaN;
                        this.setState({ inputsList: [...this.state.inputsList, componentElement], displayCardAdditionToast: true });
                        break;

                        // Numerical Input Card
                    case 'NumericalInput':
                        componentElement.questionText = '';
                        componentElement.value = Number.NaN;
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
                        componentElement.outputassociationelement = null;
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
                        componentElement.availableVariables = this.state.inputsList;
                        componentElement.formula =  '';
                        this.setState({ outputsList: [...this.state.outputsList, componentElement] });
                        break;
                }
                break;
        }
    }

    capturePreviewFieldStateChange(stateObject) {
        switch(stateObject.type) {
            case "input":
                const stateObjectToBeUpdatedIndex_m = this.state.inputsList.findIndex(item => item.uuid == stateObject.uuid);
                const updatingCardObject = this.state.inputsList[stateObjectToBeUpdatedIndex_m];
                const updatingCardName = updatingCardObject.questionText;
                this.state.formulaValues[updatingCardName] = stateObject.value;

                this.setState(prevState => {
                    let inputsListLocalCopy = prevState.inputsList;
                    inputsListLocalCopy[stateObjectToBeUpdatedIndex_m].value = stateObject.value;
                    return { inputsList: inputsListLocalCopy };
                });

                console.log(this.state.inputsList);
                break;
            default:
                console.warn("Unknow Preview Field change case.");
                break;
        }
    }


    // METHOD for capturing the state changes in the card components
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
                            outputListLocalCopy[stateObjectToBeUpdatedIndex_o].formula = stateObject.formula;
                            outputListLocalCopy[stateObjectToBeUpdatedIndex_o].availableVariables = stateObject.availableVariables;
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
                        return false;
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
        this.setState({ cardDeleteModalDisplay: false }, () => { this.deleteAssistFunction(); });
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
                        return (cardItem.previewModeDisplay ? (<SelectInputCardPreviewMode cardElement={cardItem} stateChangeMethod={this.capturePreviewFieldStateChange} elementIndex={index} key={cardItem.uuid}></SelectInputCardPreviewMode>) : (<></>));
                    case "NumericalInput":
                        return (cardItem.previewModeDisplay ? (<NumericalInputCardPreviewMode cardElement={cardItem} stateChangeMethod={this.capturePreviewFieldStateChange} elementIndex={index} key={cardItem.uuid}></NumericalInputCardPreviewMode>) : (<></>));
                    case "BivalentInput":
                        return (cardItem.previewModeDisplay ? (<BivalentInputCardPreviewMode cardElement={cardItem} stateChangeMethod={this.capturePreviewFieldStateChange} elementIndex={index} key={cardItem.uuid}></BivalentInputCardPreviewMode>) : (<></>));
                    case "SliderInput":
                        return (cardItem.previewModeDisplay ? (<SliderInputCardPreviewMode cardElement={cardItem} stateChangeMethod={this.capturePreviewFieldStateChange} elementIndex={index} key={cardItem.uuid}></SliderInputCardPreviewMode>) : (<></>));
                    case "PointInput":
                        { !this.state.displayTotalInputScore ? this.setState({ displayTotalInputScore: true }) : nll };
                        return (cardItem.previewModeDisplay ? (<PointInputCardPreviewMode inputCardtotalScoreUpdateMethod={this.updateNumericalOutputCardTotalScore} cardElement={cardItem} elementIndex={index} key={cardItem.uuid}></PointInputCardPreviewMode>) : (<></>));
                    case "DescriptionComponent":
                        return (cardItem.previewModeDisplay ? (<DescriptionCardPreviewMode cardElement={cardItem} elementIndex={index} key={cardItem.uuid}></DescriptionCardPreviewMode>) : (<></>));
                    case "ReferenceComponent":
                        return (cardItem.previewModeDisplay ? (<ReferenceCardPreviewMode cardElement={cardItem} elementIndex={index} key={cardItem.uuid}></ReferenceCardPreviewMode>) : (<></>));
                    case "NumericalOutputComponent":
                        return (cardItem.previewModeDisplay ? (<NumericalOutputCardPreviewMode cardElement={cardItem} elementIndex={index} key={cardItem.uuid}></NumericalOutputCardPreviewMode>) : (<></>));
                }
        }
    };

    // method for handling the delete action of a card component
    handleCardComponentDelete(stateObject) {
        this.setState({ cardDeleteModalDisplay: true, objectToBeDeleted: stateObject });
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

    // method for handling the save form option confirmation
    handleSaveFormOptionConfirmation(actionType){
        switch(actionType){
            case 'SAVE':
                if (this.state.saveFormDialogBoxOptions.formName.length > 0) {
                    const FORM_NAME = this.state.saveFormDialogBoxOptions.formName;
                    const META_CARD_LIST = this.state.metaList;
                    const INPUTS_CARD_LIST = this.state.inputsList;
                    const OUTPUTS_CARD_LIST = this.state.outputsList;

                    this.setState(prevState => {
                        let saveFormDialogBoxOptionsCopy = prevState.saveFormDialogBoxOptions;
                        saveFormDialogBoxOptionsCopy['display'] = false;
                        saveFormDialogBoxOptionsCopy['name_requirement_warning'] = false;
                        saveFormDialogBoxOptionsCopy['formName'] = '';
                        return { saveFormDialogBoxOptions: saveFormDialogBoxOptionsCopy };
                    });

                    // Performing the form saving action.
                    createForm(FORM_NAME, META_CARD_LIST, INPUTS_CARD_LIST, OUTPUTS_CARD_LIST).then(data => {
                        if (data.error) {
                            alert("The form couldn't be saved. Please try again !");
                        } else {
                            alert('The form has been saved successfully !');
                        }
                    });

                } else {
                    this.setState(prevState => {
                        prevState.saveFormDialogBoxOptions['name_requirement_warning'] = true;
                        return {saveFormDialogBoxOptions: prevState.saveFormDialogBoxOptions };
                    });
                }
                break;
            case 'CANCEL':
                this.setState(prevState => {
                    let saveFormDialogBoxOptionsCopy = prevState.saveFormDialogBoxOptions;
                    saveFormDialogBoxOptionsCopy['display'] = false;
                    saveFormDialogBoxOptionsCopy['name_requirement_warning'] = false;
                    saveFormDialogBoxOptionsCopy['formName'] = '';
                    return { saveFormDialogBoxOptions: saveFormDialogBoxOptionsCopy };
                });
                break;
        }
    }

    // method for handling the save form option
    handleSaveFormOption(){
        if (this.state.previewMode){

            const META_CARD_LIST = this.state.metaList;
            const INPUTS_CARD_LIST = this.state.inputsList;
            const OUTPUTS_CARD_LIST = this.state.outputsList;

            // checking whether the form to be saved is not empty and contains some cards
            if (META_CARD_LIST.length > 0 || INPUTS_CARD_LIST.length > 0 || OUTPUTS_CARD_LIST.length > 0) {
                this.setState(prevState => {
                    prevState.saveFormDialogBoxOptions['display'] = true;
                    return { saveFormDialogBoxOptions: prevState.saveFormDialogBoxOptions };
                });
            } else {
                alert('A form cannot be empty and needs to have some card components within it !');
            }
        } else {
            alert('A form can be saved in preview mode only !');
        }
    }

    // method for handling saved form selection request
    handleViewSavedFormSelectionRequest(formID, formName){
        const selectedFormUUID = formID;
        const selectedFormName = formName;
        this.setState({
            viewSavedFormsDialogBox: {
                display: true,
                viewSelectedForm: false,
                deleteSelectedForm: false,
                selectedFormDetails: { UUID: selectedFormUUID, name: selectedFormName }
            }
        });
    }

    // method for handling delete saved form request
    deleteSavedFormRequest(){
        const formToBeDeletedUUID = this.state.viewSavedFormsDialogBox.selectedFormDetails['UUID'];
        deleteForm(formToBeDeletedUUID).then(data => {
            if (data.error) {
                alert(' Form deletion failed. Please try again later ! ');
            } else {
                this.setState( prevState => {
                    const savedFormListFilteredCopy = prevState.savedFormsList.filter(form => form._id != this.state.viewSavedFormsDialogBox['selectedFormDetails']['UUID']);
                    return {
                        viewSavedFormsDialogBox: {
                            display: false,
                            viewSelectedForm: false,
                            deleteSelectedForm: false,
                            selectedFormDetails: { UUID: '', name: '' }
                        },
                        viewSavedFormsMenu: false,
                        savedFormsList: savedFormListFilteredCopy
                    };
                });
                alert('The form has been deleted successfully !');
            }
        }).catch(err => {console.warn(err);});
    }

    // method for handling the fetching a saved form request
    fetchSavedForm(){
        // Checking if the preview mode is enabled.
        if (this.state.previewMode){
            const formToBeViewedUUID = this.state.viewSavedFormsDialogBox.selectedFormDetails['UUID'];
            fetchForm(formToBeViewedUUID).then( data => {
                if (data.error){
                    alert( ' Failure in fetching the form. Please try again later !' );
                } else {
                    this.setState({
                        metaList: data.form.metaCardList,
                        inputsList: data.form.inputsCardList,
                        outputsList: data.form.outputsCardList,
                        viewSavedFormsDialogBox: {
                            display: false,
                            viewSelectedForm: false,
                            deleteSelectedForm: false,
                            selectedFormDetails: { UUID: '', name: '' }
                        },
                        viewSavedFormsMenu: false
                    });
                }
            }).catch(err => console.warn(err));

        } else {
            alert('Please enable preview mode to view a saved form !');
        }
    }

    render() {
        return (<>

            {/* View Selected Saved Form Dialog Box */}
            <Modal
                show={this.state.viewSavedFormsDialogBox['display']}
                onHide = { () => {
                    this.setState(prevState => {
                        prevState.viewSavedFormsDialogBox['display'] = false;
                        return { viewSavedFormsDialogBox: prevState.viewSavedFormsDialogBox };
                    });
                } }
                backdrop="static"
                keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>{this.state.viewSavedFormsDialogBox['selectedFormDetails']['name']}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Please select from the following options that would you like to perform on the selcted form: </div>
                    <div className="text-center border-2 border-blue-900 rounded my-1.5 font-semibold hover:bg-blue-900 hover:text-white cursor-pointer" onClick={this.fetchSavedForm}>View / Edit</div>
                    <div className="text-center border-2 border-red-500 rounded my-1.5 font-semibold hover:bg-red-500 hover:text-white cursor-pointer" onClick={this.deleteSavedFormRequest}>Delete</div>
                </Modal.Body>
            </Modal>
            {/* View Selected Saved Form Dialog Box */}

            {/* Save Form Dialog Box */}
            <Modal
                show={this.state.saveFormDialogBoxOptions['display']}
                onHide = { () => {
                    this.setState(prevState => {
                        prevState.saveFormDialogBoxOptions['display'] = false;
                        return { saveFormDialogBoxOptions: prevState.saveFormDialogBoxOptions };
                    });
                } }
                backdrop="static"
                keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>From Details Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Please provide a name for the form:</div>
                    <div>
                        <input
                            className="w-full border-2 border-black	rounded p-1 px-2 mt-1.5"
                            placeholder="Form Name"
                            value = {this.state.saveFormDialogBoxOptions['formName']}
                            onChange={(e)=>{
                                this.setState(prevState=>{
                                    let saveFormDialogBoxOptionsCopy = prevState.saveFormDialogBoxOptions;
                                    saveFormDialogBoxOptionsCopy['formName'] = e.target.value;
                                    return { saveFormDialogBoxOptions: saveFormDialogBoxOptionsCopy };
                                });
                            }
                            }/>
                    </div>
                    {this.state.saveFormDialogBoxOptions['name_requirement_warning'] && (
                        <div className="text-sm mt-2 text-red-500">
                            Please provide a name for the form.
                        </div>)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=>{this.handleSaveFormOptionConfirmation('CANCEL');}}>
                        Close
                    </Button>
                    <Button variant="success" onClick={()=>{this.handleSaveFormOptionConfirmation('SAVE');}}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Save Form Dialog Box */}

            {/* Card Selection Confirmation Toast message */}
            <ToastContainer position='bottom-end' className="m-4">
                <Toast onClose={() => this.setState({displayCardAdditionToast: false})} show={this.state.displayCardAdditionToast} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto text-blue-900">Alert</strong>
                    </Toast.Header>
                    <Toast.Body className="text-blue-900">The selected card has been added to dashboard !</Toast.Body>
                </Toast>
            </ToastContainer>
            {/* Card Selection Confirmation Toast message */}

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
                <Offcanvas show={this.state.showSideBarMenu} onHide={()=>this.toggleSideBarMenu("CREATE-CARD-OPTION")}>
                    <Offcanvas.Header closeButton>
                        <div className="text-4xl text-blue-900">Components</div>
                    </Offcanvas.Header>

                    <Offcanvas.Body className="divide-y divide-gray-300" style={{background: "#EEE"}}>
                        {/* TODO make these cards click through*/}

                        <h3>Meta Cards</h3>
                        <div className="demo-cards" onClick={() => {
                            this.sideBarOptionSelected('meta', 'DescriptionComponent', null);
                        }}>
                            <DecriptionCardComponent cardElement={{}} />
                        </div>

                        <div className="demo-cards" onClick={() => {
                            this.sideBarOptionSelected('meta', 'ReferenceComponent',null);
                        }}>
                            <ReferenceCard cardElement={{}} />
                        </div>


                        <h3>Input Cards</h3>
                        <div className="demo-cards" onClick={() => {
                            this.sideBarOptionSelected('input', 'SelectInput',null);
                        }}>
                            <SelectInputCard cardElement={{}} />
                        </div>
                        <div className="demo-cards" onClick={() => {
                            this.sideBarOptionSelected('input', 'NumericalInput',null);
                        }}>
                            <NumericalInputCard cardElement={{}} />
                        </div>
                        <div className="demo-cards" onClick={() => {
                            this.sideBarOptionSelected('input', 'BivalentInput',null);
                        }} >
                            <BivalentInputCard className="demo-cards" cardElement={{}} />
                        </div>
                        <div className="demo-cards" onClick={() => {
                            this.sideBarOptionSelected('input', 'SliderInput',null);
                        }}>
                            <SliderInputCard cardElement={{}} />
                        </div>

                        {/* <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900" onClick={() => {
                            this.sideBarOptionSelected('input', 'PointInput',null);
                            }}>
                            <PointInputCard className="demo-cards" cardElement={{}} />
                            </div> */}

                        <h3>Output Cards</h3>
                        <div className="demo-cards" onClick={() => {
                            this.sideBarOptionSelected('output', 'NumericalOutputComponent',null);
                        }}>
                            <NumericalOutputCard cardElement={{}}/>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
                {/* side bar menu for card components */}

                {/* side bar menu for viewing saved forms menu */}
                <Offcanvas show={this.state.viewSavedFormsMenu} onHide={()=>this.toggleSideBarMenu("VIEW-SAVED-FORMS-OPTION")}>
                    <Offcanvas.Header closeButton>
                        <div className="text-4xl text-blue-900">Saved Forms</div>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="divide-y divide-gray-300">
                        {this.state.savedFormsList.length > 0 ?
                                                            (<>{this.state.savedFormsList.map((form, id) => {
                                                                    return (
                                                                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900" id={id} onClick={() => { this.handleViewSavedFormSelectionRequest(form._id, form.name); }}>{form.name}</div>
                                                                    );
                                                                })}</>)
                                                           :(<div className="text-lg text-blue-900">No saved forms found !</div>)}
                    </Offcanvas.Body>
                </Offcanvas>
                {/* side bar menu for viewing saved forms menu */}

                {/* studio navbar */}
                <div className="w-screen p-1 flex justify-between items-center">
                    <div className="text-3xl text-blue-900 m-1 inline-block font-semibold">Lexicon Studio</div>
                    <div className="flex items-center">
                        {!this.state.previewMode && (
                            <div className="text-blue-900 text-lg mr-2 px-1.5 py-1 cursor-pointer border-b-2 border-transparent hover:border-blue-900" onClick={()=>this.toggleSideBarMenu("CREATE-CARD-OPTION")}>
                                <FontAwesomeIcon icon={faPlusCircle} className="mr-1.5" />Create
                            </div>
                        )}
                        <div className="text-blue-900 text-lg mr-2 px-1.5 py-1 cursor-pointer border-b-2 border-transparent hover:border-blue-900" onClick={this.togglePreviewMode}>
                            {this.state.previewMode ? (<><FontAwesomeIcon icon={faEyeSlash} className="mr-1.5" />Disable Preview Mode</>) : (<><FontAwesomeIcon icon={faEye} className="mr-1.5" />Enable Preview Mode</>)}
                        </div>
                        <div className="text-blue-900 text-lg mr-2 px-1.5 py-1 cursor-pointer border-b-2 border-transparent hover:border-blue-900" onClick={this.handleSaveFormOption}>
                            <FontAwesomeIcon icon={faFileExport} className="mr-1.5" />Save Form
                        </div>
                        <div className="text-blue-900 text-lg mr-2 px-1.5 py-1 cursor-pointer border-b-2 border-transparent hover:border-blue-900" onClick={()=>this.toggleSideBarMenu("VIEW-SAVED-FORMS-OPTION")}>
                            <FontAwesomeIcon icon={faBook} className="mr-1.5" />View Saved Forms
                        </div>
                    </div>
                </div>
                {/* studio navbar */}
                {/* card display section */}
                <div className="flex flex-column items-center mt-4">
                    {/* meta column */}
                    <div className="w-1/2 mx-2">
                        <div className="transition ease-in-out duration-500 w-full sm:shadow hover:shadow-md border px-2 rounded-sm text-blue-900 text-lg py-2 mb-2 select-none">
                            <FontAwesomeIcon icon={faEllipsisV} className="mr-2" />Meta
                        </div>
                        {this.state.metaList.map((item, index) => (this.conditionalCardRender(item, index)))}
                    </div>
                    {/* meta column */}
                    {/* inputs column */}
                    <div className="w-1/2 mx-2">
                        <div className="transition ease-in-out duration-500 w-full sm:shadow hover:shadow-md border px-2 rounded-sm text-blue-900 text-lg py-2 mb-2 select-none">
                            <FontAwesomeIcon icon={faEllipsisV} className="mr-2" />Inputs
                        </div>
                        {this.state.inputsList.map((item, index) => (this.conditionalCardRender(item, index)))}
                    </div>
                    {/* input column */}
                    {/* outputs column */}
                    <div className="w-1/2 mx-2">
                        <div className="transition ease-in-out duration-500 w-full sm:shadow hover:shadow-md border px-2 rounded-sm text-blue-900 text-lg py-2 mb-2 select-none">
                            <FontAwesomeIcon icon={faEllipsisV} className="mr-2" />Outputs
                        </div>
                        {this.state.outputsList.map((item, index) => (this.conditionalCardRender(item, index)))}
                    </div>
                    {/* outputs column */}
                </div>
                {/* card display section */}
            </div>
        </>
        );
    }
}

export default studioMain;
