import monash_health_json_doc from "../../../public/parsing_engine/JSON_doc/alteplase_for_acute_ischaemic_stroke.json";
import { adjacency_list_transform, represent } from "./parsing_engine";
import React, { Component } from "react";

class EngineSection extends Component {
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
      <div>
        {/* Section Heading Block */}
        <div className="flex justify-between w-screen">
          {/* Heading */}
          <div className="text-4xl text-blue-900 m-1 inline-block">
            Parsing Engine
          </div>
        </div>
        {/* JSON Format Display Section */}
        <div className="w-screen h-70vh">
          <div className="m-2 border-2 border-blue-900 rounded-lg bg-gray-100 p-2 min-h-5vh">
            {this.state.data}
          </div>
        </div>
      </div>
    );
  }
}

export default EngineSection;
