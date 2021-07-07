import React from 'react'
import {iLogo} from "./types";

const LexiconLogo : React.FC<iLogo> = ({size}) => {
  return (
    <h1 className="font-bold text-3xl text-blue-800">
      Lexicon
    </h1>
  )
}

export default LexiconLogo
