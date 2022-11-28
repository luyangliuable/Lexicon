import React, { Component } from "react";
import { adjacency_list_transform, represent } from "./parsing_engine";

class SearchSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
              {/* Section Heading Block */}
            <input type="text" style={{background: 'red'}} />
            </div>
        );
    }
}

export default SearchSection;
