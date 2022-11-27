import React, { Component, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import UploadBox from './upload_box';


class EngineUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    onDrop() {
        console.log("Droppped");
    }


    render() {
        return (
            <form style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <UploadBox />
            </form>
        );
    }
}

export default EngineUpload;
