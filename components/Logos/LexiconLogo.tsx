import React from "react"
import Link from "next/link";

import { iLogo } from "./types"

const LexiconLogo: React.FC<iLogo> = ({ size }) => {
  return <div>
      <h1 className="font-bold text-blue-900 cursor-pointer w-min logo">Lexicon</h1>
  </div>
}

export default LexiconLogo
