import { faEllipsisV, faEye, faFileExport, faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { Component } from "react";
import DecriptionCardComponent from "./../../components/StudioComponents/descriptionCard";
import NumericalOutputCard from "../../components/StudioComponents/numericalOutputCard";
import ReferenceCard from "../../components/StudioComponents/referenceCard";
import NumericalInputCard from "../../components/StudioComponents/numericalInput";
import SelectInputCard from "../../components/StudioComponents/selectInputCard";

class studioMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSideBarMenu: false,
            selectInputCard: [],
            numericalInputCard: [],
            descriptionCard: [],
            referenceCard: [],
            numericalOutputCard: [],
            ControllerCard: []
        }
        this.toggleSideBarMenu = this.toggleSideBarMenu.bind(this);
    }

    // method for handling the opening and the closure of the side bar menu
    toggleSideBarMenu() {
        console.log("Hello");
        if (this.state.showSideBarMenu) {
            this.setState({
                showSideBarMenu: false
            })
        }
        else {
            this.setState({ showSideBarMenu: true })
        }
    }

    render() {
        return (<>
            <div className="w-100vw h-100vh">
                {/* side bar menu for card components */}
                <Offcanvas show={this.state.showSideBarMenu} onHide={this.toggleSideBarMenu}>
                    <Offcanvas.Header closeButton>
                        <div className="text-4xl text-blue-900">Components</div>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="divide-y divide-gray-300">
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900">Select Input Card</div>
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900">Numerical Input Card</div>
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900">Description Card</div>
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900">Reference Card</div>
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900">Numerical Output Card</div>
                        <div className="text-xl py-2 cursor-pointer hover:underline hover:bg-gray-200 text-blue-900">Controller Card</div>
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
                        <div className="text-blue-900 text-lg mr-2 px-1.5 py-1 cursor-pointer border-b-2 border-transparent hover:border-blue-900">
                            <FontAwesomeIcon icon={faEye} className="mr-1.5" />Preview
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
                        <DecriptionCardComponent></DecriptionCardComponent>
                        <ReferenceCard></ReferenceCard>
                    </div>
                    {/* meta column */}
                    <div className="w-1/3 mx-2">
                        <div className="w-full mb-2 shadow-md border px-2 rounded-md text-blue-900 text-lg h-9 pt-1">
                            <FontAwesomeIcon icon={faEllipsisV} className="mr-2" />Inputs
                        </div>
                        <NumericalInputCard></NumericalInputCard>
                        <SelectInputCard></SelectInputCard>
                    </div>
                    <div className="w-1/3 mx-2">
                        <div className="w-full mb-2 shadow-md border px-2 rounded-md text-blue-900 text-lg h-9 pt-1">
                            <FontAwesomeIcon icon={faEllipsisV} className="mr-2" />Outputs
                        </div>
                        <NumericalOutputCard></NumericalOutputCard>
                    </div>
                </div>
                {/* card display section */}
            </div>
        </>)
    }
}

export default studioMain;