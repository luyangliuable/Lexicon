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
        rounded={true}
      />

      <CircleButton
        className="text-blue-800 text-xl text-white ml-3"
        onClick={() => {}}
        tooltip={"Search"}
        Icon={<FaSearch />}
        enable={true}
      />
    </div>
  )
}

export default Search
