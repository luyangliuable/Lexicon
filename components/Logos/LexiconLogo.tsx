import React from "react"
import Link from "next/link";

import { iLogo } from "./types"

const LexiconLogo: React.FC<iLogo> = ({ size }) => {
  return <div>
    <Link href="/"><h1 className="font-bold text-3xl text-blue-900 cursor-pointer w-min">Lexicon</h1></Link>
  </div>
}

export default LexiconLogo
