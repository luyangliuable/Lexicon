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
              <div style={{
                  display: "flex",
                  padding: "100px",
                  background: "#EEE",
                  width: "80vw",
                  height: "32vw",
                  borderRadius: "8px",
                  boxShadow: "2px 2px 5px #888",
                  alignItems: "center"
              }}>
                <UploadBox />
                {/* <input type="submit" className="button" /> */}
              </div>
            </form>
        );
    }
}

export default EngineUpload;
