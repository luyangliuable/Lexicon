import { faEllipsisV, faEye, faEyeSlash, faFileExport, faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { Component } from "react";
import DecriptionCardComponent from "./../../components/StudioComponents/descriptionCard/descriptionCard";
import NumericalOutputCard from "../../components/StudioComponents/numericalOutputCard/numericalOutputCard";
import ReferenceCard from "../../components/StudioComponents/referenceCard/referenceCard";
import NumericalInputCard from "../../components/StudioComponents/numericalInputCard/numericalInput";
import SelectInputCard from "../../components/StudioComponents/selectInputCard/selectInputCard";

class studioMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSideBarMenu: false,
            metaList: [],
            inputsList: [],
            outputsList: [],
            previewMode: false
        }
        this.toggleSideBarMenu = this.toggleSideBarMenu.bind(this);
        this.togglePreviewMode = this.togglePreviewMode.bind(this);
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
            window.alert("Cards cannot be added or edited in a preview mode !");
        }
    }

    // method for toggling the preview mode
    togglePreviewMode() {
        if (!this.state.previewMode) { this.setState({ previewMode: true }); }
        else { this.setState({ previewMode: false }); }
    }

    // method when one of the side bar options has been selected 
    sideBarOptionSelected = (event) => {
        const componentType = event.target.getAttribute('data-component-type');
        const componentName = event.target.getAttribute('data-component-name');
        const componentElement = { type: componentType, name: componentName }
        if (componentType === "input") {
            this.setState({ inputsList: [...this.state.inputsList, componentElement] })
        } else if (componentType === "meta") {
            this.setState({ metaList: [...this.state.metaList, componentElement] })
        } else {
            this.setState({ outputsList: [...this.state.outputsList, componentElement] })
        }
    }

    render() {
        return (<>
            <div className="w-100vw min-h-screen">
                {/* side bar menu for card components */}
                <Offcanvas show={this.state.showSideBarMenu} onHide={this.toggleSideBarMenu}>
                    <Offcanvas.Header closeButton>
                        <div className="text-4xl text-blue-900">Components</div>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="divide-y divide-gray-300">
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900" data-component-type="input" data-component-name="SelectInput" onClick={this.sideBarOptionSelected}>Select Input Card</div>
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900" data-component-type="input" data-component-name="NumericalInput" onClick={this.sideBarOptionSelected}>Numerical Input Card</div>
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900" data-component-type="meta" data-component-name="DescriptionComponent" onClick={this.sideBarOptionSelected}>Description Card</div>
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900" data-component-type="meta" data-component-name="ReferenceComponent" onClick={this.sideBarOptionSelected}>Reference Card</div>
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900" data-component-type="output" data-component-name="NumericalOutputComponent" onClick={this.sideBarOptionSelected}>Numerical Output Card</div>
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
                            <FontAwesomeIcon icon={faFileExport} className="mr-1.5" />Export to JSON
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
                        {this.state.metaList.map((item, index) => <>{item.name == "ReferenceComponent" ? (<ReferenceCard elementIndex={index} key={index}></ReferenceCard>) : (<DecriptionCardComponent elementIndex={index} key={index}></DecriptionCardComponent>)}</>)}
                    </div>
                    {/* meta column */}
                    <div className="w-1/3 mx-2">
                        <div className="w-full mb-2 shadow-md border px-2 rounded-md text-blue-900 text-lg h-9 pt-1">
                            <FontAwesomeIcon icon={faEllipsisV} className="mr-2" />Inputs
                        </div>
                        {this.state.inputsList.map((item, index) => <>{item.name == "SelectInput" ? (<SelectInputCard elementIndex={index} key={index}></SelectInputCard>) : (<NumericalInputCard elementIndex={index} key={index}></NumericalInputCard>)}</>)}
                    </div>
                    <div className="w-1/3 mx-2">
                        <div className="w-full mb-2 shadow-md border px-2 rounded-md text-blue-900 text-lg h-9 pt-1">
                            <FontAwesomeIcon icon={faEllipsisV} className="mr-2" />Outputs
                        </div>
                        {this.state.outputsList.map((item, index) => <NumericalOutputCard elementIndex={index} key={index}></NumericalOutputCard>)}

                    </div>
                </div>
                {/* card display section */}
            </div>
        </>)
    }
}

export default studioMain;