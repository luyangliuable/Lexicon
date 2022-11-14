import React, { useState } from "react"

function PointInputCardPreviewMode(props) {
  const [totalScore, updateTotalScore] = useState(0)
  const [optionsSelectedArray, setOptionsSelectedArray] = useState([])
  const optionSelectedStyleString =
    "w-1/2 px-1.5 border-r border-blue-900 flex justify-between cursor-pointer bg-blue-600 text-white"
  const optionNotSelectedStyleString =
    "w-1/2 px-1.5 border-l border-blue-900 flex justify-between cursor-pointer text-blue-900"

  function addOptionToOptionsSelectedArray(UUID, score, array) {
    const currentOption = { optionUUID: UUID, optionScore: score }
    if (!array.some(option => option.optionUUID === currentOption.optionUUID)) {
      if (array.length === parseInt(props.cardElement.maxSelectionVal)) {
        alert(
          `You can only select ${props.cardElement.maxSelectionVal} options !`
        )
      } else {
        setOptionsSelectedArray(oldArray => [...oldArray, currentOption])
        if (props.cardElement.outputAssociation) {
          props.inputCardtotalScoreUpdateMethod(
            currentOption.optionScore,
            "ADD",
            props.cardElement.outputAssociationElement.uuid
          )
        }
        updateTotalScore(totalScore + currentOption.optionScore)
      }
    }
  }

  function removeOptionFromOptionsSelectedArray(UUID, score, array) {
    const optionToBeRemoved = { optionUUID: UUID, optionScore: score }
    if (
      array.some(option => option.optionUUID === optionToBeRemoved.optionUUID)
    ) {
      setOptionsSelectedArray(oldArray =>
        oldArray.filter(
          option => option.optionUUID != optionToBeRemoved.optionUUID
        )
      )
      if (props.cardElement.outputAssociation) {
        props.inputCardtotalScoreUpdateMethod(
          optionToBeRemoved.optionScore,
          "SUBTRACT",
          props.cardElement.outputAssociationElement.uuid
        )
      }
      updateTotalScore(totalScore - optionToBeRemoved.optionScore)
    }
  }

  return (
    <>
      <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
        {/* question row */}
        <div className="inline-block font-semibold text-lg w-full text-blue-900 mb-2 break-all">
          {props.cardElement.questionText}
        </div>
        {/* question row */}
        {/* options row */}
        <div className="">
          {Object.keys(props.cardElement.optionsObject).map(
            (keyName, index) => (
              <div
                key={keyName}
                className="w-full h-9 mb-1 bg-blue-100 border-1 border-blue-400 rounded flex flex-row justify-between"
              >
                <div className="flex w-full">
                  <div className="flex flex-row justify-around py-0.5 mx-0.5">
                    <div className="h-full px-2 pt-0.5 w-7 text-center border rounded bg-blue-600 text-white">
                      {index}
                    </div>
                  </div>
                  {props.cardElement.maxSelectionVal > 1 ? (
                    <>
                      <div className="font-bold px-1 text-lg text-blue-800 overflow-x-hidden w-2/3 m-0.5 mr-1.5 rounded">
                        {props.cardElement.optionsObject[keyName].optionText}
                      </div>
                      <div className="flex text-sm my-1 w-1/3 border-2 border-blue-900 mr-3 rounded">
                        <div
                          className={
                            optionsSelectedArray.some(
                              option => option.optionUUID === keyName
                            )
                              ? optionNotSelectedStyleString
                              : optionSelectedStyleString
                          }
                          onClick={() =>
                            removeOptionFromOptionsSelectedArray(
                              keyName,
                              props.cardElement.optionsObject[keyName]
                                .optionScore,
                              optionsSelectedArray
                            )
                          }
                        >
                          <span className="pt-px">No</span>
                          <span className="pt-px">0</span>
                        </div>
                        <div
                          className={
                            optionsSelectedArray.some(
                              option => option.optionUUID === keyName
                            )
                              ? optionSelectedStyleString
                              : optionNotSelectedStyleString
                          }
                          onClick={() =>
                            addOptionToOptionsSelectedArray(
                              keyName,
                              props.cardElement.optionsObject[keyName]
                                .optionScore,
                              optionsSelectedArray
                            )
                          }
                        >
                          <span className="pt-px">Yes</span>
                          <span className="pt-px">
                            {props.cardElement.optionsObject[keyName]
                              .optionScore > 0 ? (
                              <>
                                +
                                {
                                  props.cardElement.optionsObject[keyName]
                                    .optionScore
                                }
                              </>
                            ) : (
                              <>
                                {
                                  props.cardElement.optionsObject[keyName]
                                    .optionScore
                                }
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-bold text-lg text-blue-800 overflow-x-auto w-4/5 m-0.5 px-1">
                        {props.cardElement.optionsObject[keyName].optionText}
                      </div>
                      <div className="flex">
                        <div className="px-1.5 py-0.5 m-1">
                          <input
                            type="radio"
                            className="cursor-pointer"
                            name={props.cardElement.uuid}
                            onClick={() => {
                              updateTotalScore(
                                props.cardElement.optionsObject[keyName]
                                  .optionScore
                              )
                              props.inputCardtotalScoreUpdateMethod(
                                props.cardElement.optionsObject[keyName]
                                  .optionScore - totalScore,
                                "ADD",
                                props.cardElement.outputAssociationElement.uuid
                              )
                            }}
                          ></input>
                        </div>
                        <div className="text-blue-900 border-1 rounded border-blue-900 m-1 px-1 bg-blue-200 font-medium w-12 text-center">
                          <span className="ml-0.5">
                            {props.cardElement.optionsObject[keyName]
                              .optionScore > 0 ? (
                              <>
                                +
                                {
                                  props.cardElement.optionsObject[keyName]
                                    .optionScore
                                }
                              </>
                            ) : (
                              <>
                                {
                                  props.cardElement.optionsObject[keyName]
                                    .optionScore
                                }
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          )}
        </div>
        {/* options row */}
        {/* total score row */}
        <div className="flex px-1 w-full text-blue-900 text-sm">
          <span className="font-bold mr-1">NOTE: </span> You can only select{" "}
          {props.cardElement.maxSelectionVal} option(s).
        </div>
        {/* total score row */}
      </div>
    </>
  )
}

export default PointInputCardPreviewMode
