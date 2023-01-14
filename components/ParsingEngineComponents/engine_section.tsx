import React, { Component } from "react";
import UploadBox from './upload_box';

import monash_health_json_doc from "../../public/parsing_engine/JSON_doc/alteplase_for_acute_ischaemic_stroke.json";
import { adjacency_list_transform, represent } from "./parsing_engine.tsx";

interface EngineSectionInterface {
    data: number
}

class EngineSection extends Component<EngineSectionInterface> {
    constructor(props) {
        super(props);

        this.state = {
            data: "",
        };
    }

    componentDidMount() {
        this.setState({
            data: represent(adjacency_list_transform(monash_health_json_doc)),
        });
    }

    render() {
        return (
            <div style={{height: "90vh", display: "flex", alignItems: "center"}}>
              {/* Section Heading Block */}
              <div className="w-screen">
                {/* Heading */}
              </div>
              <UploadBox />
              {/* JSON Format Display Section */}
              <div className="w-screen mb-8">
                {/* <div */}
                {/*   id="json-doc-display" */}
                {/*   className="m-2 border-2 border-blue-900 rounded-lg bg-gray-100 p-2 min-h-5vh" */}
                {/* > */}
                {/*   {this.state.data} */}
                {/* </div> */}
              </div>
            </div>
        );
    }
}

export default EngineSection;
