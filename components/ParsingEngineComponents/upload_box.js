import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
// import { getResultLink } from "./function/getResults";

const UploadBox = ({
    currentAppStatus,
    acceptedFileTypes,
    method,
    requester,
}) => {
    const [objectState, setObjectState] = useState({
        buttonState: false,
        // selectedFile: null,
        requester: requester,
    });

    useEffect(() => {
        console.log("Requester is " + requester);
        console.log(objectState);
        // console.log(getResultLink("upload"));
    }, [currentAppStatus, objectState, requester]);

    const onDropAccepted = useCallback(
        (acceptedFiles) => {
            objectState.selectedFile = acceptedFiles[0];
            setObjectState(objectState);
            method(objectState);
        },
        [method, objectState]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDropAccepted: onDropAccepted,
        maxFiles: 1,
        disabled: objectState.buttonState,
        accept: acceptedFileTypes,
    });

    return (
            <div className="upload-box-root">
            <div {...getRootProps()} disabled={objectState.buttonState}>
            <input {...getInputProps()} disabled={objectState.buttonState} />

            <div className="upload-box-full-width">
            </div>

            <div className="upload-vspacing-10"> </div>

            <div className="upload-box-full-width">
            <p className="upload-box-text-30">
            {objectState.selectedFile
             ? objectState.selectedFile.name
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
    );
};

export default UploadBox;
