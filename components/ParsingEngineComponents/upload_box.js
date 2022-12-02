import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

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


    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});


    const upload = (files) => {
        setObjectState(prev => {
            return {
                ...prev,
                buttonState: true
            };
        });

        objectState.acceptedFile.delete("tags");
        objectState.acceptedFile.append("tags", document.getElementById("guide-tags").value);

        fetch('http://localhost:9000/parsingEngine/upload', {
            method: 'POST',
            body: objectState.acceptedFile
        })
            .then(response => response.json())
            .then(response => {
                setTimeout(() => {
                    setObjectState(prev => {
                        return {
                            ...prev,
                            buttonState: false
                        };
                    });
                }, 1500);
            })
            .catch(err => {
                console.log(err);
                setTimeout(() => {
                    setObjectState(prev => {
                        return {
                            ...prev,
                            buttonState: false
                        };
                    });
                }, 1500);
            });

    };

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
          <div className="upload-box-root" {...getRootProps()}>
            <input {...getInputProps()} id="actual-upload-button" style={{display: "none"}}/>

            <p className="upload-box-text-30">
              {objectState.acceptedFileName
               ? objectState.acceptedFileName
               : "Drop files here"}
            </p>

            <button
              className="button"
              disabled={objectState.buttonState}
              onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById('actual-upload-button').click();
              }}

              style={
                  objectState.buttonState
                      ? { pointerEvents: "none", background: "#888"}
                  : {}
              }
            >
              {objectState.buttonState ? "Uploading..." : "Upload File"}
            </button>
          </div>

          <textarea id="guide-tags" placeholder="Enter Guide Tags Separated By Spaces Or Comma"/>

          <div className="button-holder-bottom">
            <button className="button float-right" style={
                objectState.buttonState ? {background: "#888", pointerEvents: "none"}
                : {}
            } disabled={objectState.buttonState} onClick={() => upload() }>Next</button>
          </div>
        </div>
    );
};

export default UploadBox;
