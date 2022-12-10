import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"

import CircleButton from "../AppButton/CircleButton"
import TextInput from "../utils/Form/TextInput"

interface iSearch {}

const Search: React.FC<iSearch> = () => {
  const [search, setSearch] = useState<string | null>(null)
  return (
    <div className="flex items-center">
      <TextInput
        onChange={e => setSearch(e.target.value)}
        placeholder={"Search"}
        value={search || ""}
        type={"text"}
        error={false}
        disable={false}
        name={"Search"}
        className="navbar-text-input"
      />

      <CircleButton
        className="circle-search-button"
        onClick={() => {}}
        tooltip={"Search"}
        Icon={<FaSearch style={{color: "#FFF", width: '13px', height: 'auto'}} />}
        enable={true}
      />
    </div>
  )
}

export default Search
