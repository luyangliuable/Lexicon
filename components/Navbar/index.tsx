import React from 'react'
import Link from "next/link";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SiteContainer from "../utils/SiteContainer";
import LexiconLogo from "../Logos/LexiconLogo";
import Search from "./Search";

interface iNavbar {

}

const Navbar : React.FC<iNavbar> = ({}) => {
  return (
    <>
      <nav
        className="sticky top-0 left-0 bg-white shadow border-b z-40"
        data-cy="nav"
      >
        <SiteContainer className="flex items-center justify-between py-2 text-blue-900">
          <div>
            <LexiconLogo size={100}/>
          </div>
          <div>
            <Search/>
          </div>
        </SiteContainer>
      </nav>
    </>
  );
}

export default Navbar
