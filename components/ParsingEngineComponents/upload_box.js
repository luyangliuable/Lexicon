import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
// import { getResultLink } from "./function/getResults";

const UploadBox = (props) => {
    const [objectState, setObjectState] = useState({
        buttonState: false,
    });



    const onDrop = useCallback(acceptedFiles => {
        var formData = new FormData();
        setObjectState(prev => {
            formData.append("pdfFile", acceptedFiles[0]);

            return {
                ...prev,
                acceptedFile: formData,
                acceptedFileName: acceptedFiles[0].name
            };
        });

    }, []);

    useEffect(() => {
        console.log(objectState);
    }, [objectState]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    const upload = (files) => {
        fetch('http://localhost:9000/parsingEngine/upload', {
            method: 'POST',
            body: objectState.acceptedFile
        })
            .then(response => response.json())
            .then(response => console.log(JSON.stringify(response)))
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <div className="upload-box-root" {...getRootProps()}>
            <input {...getInputProps()} style={{display: "none"}}/>
            <div disabled={objectState.buttonState}>

                <div className="upload-box-full-width">
                </div>

                <div className="upload-vspacing-10"> </div>

                <div className="upload-box-full-width">
                <p className="upload-box-text-30">
                  {objectState.acceptedFileName
                    ? objectState.acceptedFileName
                    : "Drop files here"}
                </p>
                </div>

                <div className="upload-box-center-bar">
                <div className="upload-box-line upload-box-left" />
                <div className="upload-box-line upload-box-right" />
                </div>

                <div className="upload-box-full-width"
                    style={{
                        display: "flexbox",
                        flexDirection: "column",
                    }}
                >
                <button
                    className="button btn btn-primary"
                    disabled={objectState.buttonState}
                    style={
                        objectState.buttonState
                            ? { pointerEvents: "none", width: "200px", padding: '15px', marginTop: '10px'}
                        : { width: "200px", padding: "15px", marginTop: '18px'}
                    }
                >
                    <h3>Upload File</h3>
                </button>
                </div>
            </div>

            </div>
            <div className="button-holder-bottom">
              <button className="button float-right" onClick={() => upload() }>Next</button>
            </div>
        </div>
    );
};

export default UploadBox;
