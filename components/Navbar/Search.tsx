import React from 'react'
import TextInput from "../utils/Form/TextInput";
import CircleButton from "../AppButton/CircleButton";
import {FaSearch} from "react-icons/fa";

interface iSearch{}

const Search : React.FC<iSearch> = () => {
  return <div className="flex items-center">
    <TextInput
      onChange={()=> {}}
      placeholder={"Search"}
      value={""}
      type={"text"}
      error={false}
      disable={false}
      name={"Search"}/>

      <CircleButton className="text-blue-800 text-xl text-white ml-3" onClick={() => {}} tooltip={"Search"} Icon={<FaSearch/>} enable={true}/>
  </div>
}

export default Search