import React from "react"
import Link from "next/link";

import { LexiconLogoProps } from "./types"

const LexiconLogo: React.FC<LexiconLogoProps > = ({ size }) => {
    return <div>
        <h1 className="font-bold text-blue-900 cursor-pointer w-min logo">Lexicon</h1>
    </div>
}

export default LexiconLogo
