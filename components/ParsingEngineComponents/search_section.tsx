import React, { Component } from "react";
import { adjacency_list_transform, represent } from "./parsing_engine";
import {AiOutlineFileSearch} from "react-icons/ai";


interface Search {
    search: (value: String) => String[];
}

class SearchSection extends Component implements Search {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: "",
        };

        this.state = {
            result: []
        }
    }


    componentDidMount() {
    }

    search(value: String): String[] {
        fetch('http://localhost:9000/parsingEngine/search', {
            method: 'POST',
            headers: {
                "content-type": "Application/Json"
            },
            body: JSON.stringify({value: value})
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.result);
                if ( response.result ) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            ...response
                        }
                    });
                } else {
                    this.setState({result: []});
                }
            })
            .catch(err => {
                console.log(err);
            });

        return [ this.state.result ];
    }


    render() {
        return (
            <div className="search-engine-holder" style={{}}>
                <div className="search-field-holder">
                    <AiOutlineFileSearch style={{position: "absolute", width: '2vw', height: '2vw', marginLeft: '1vw'}} />
                    <input type="text" className="search-field" onChange={(e) => {console.log(this.search(e.target.value))}}/>
                </div>

                {this.state["result"].map(( item, index ) => (
                    <div className="search-result-item">{ item.name }</div>
                    )
                )}
            </div>
        );
    }
}

export default SearchSection;
