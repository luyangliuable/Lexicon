import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

import { WhiteAppButton } from "../AppButton/buttons"
import LexiconLogo from "../Logos/LexiconLogo"
import SidebarWrapper from "../utils/SidebarWrapper"
import SiteContainer from "../utils/SiteContainer"
import DesktopNavbarLink from "./DesktopNavbarLink"
import NavbarLinksWrapper from "./NavbarLinksWrapper"
import Search from "./Search"
import NavbarOptions from "../Navbar/NavbarOptions/navbarOptions.tsx";
import Link from "next/link";

interface iNavbar {
  pageId: string
}

const Navbar: React.FC<iNavbar> = ({ pageId }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
        {/* <div className="sticky top-0 left-0 bg-white border-b z-40" style={{background: 'red', position: "absolute", width: "100vw"}}> */}
      <nav className="top-0 left-0 bg-white border-b z-40 navbar-container">
        <div className="bg-gray-200 hidden">
          <SiteContainer className="flex item-center justify-end py-2">
            <div className="flex items-center">
              <NavbarLinksWrapper>
                {data =>
                  data.map((link, index) => (
                    <DesktopNavbarLink
                      key={index}
                      link={link}
                      selected={link.id === pageId}
                    />
                  ))
                }
              </NavbarLinksWrapper>
            </div>
          </SiteContainer>
        </div>

        <SiteContainer className="flex items-center justify-between py-4 text-blue-900 navbar">
          {/* Lexicon Logo */}
          <div className="w-1/6">
            <Link href="/"><LexiconLogo size={100} /></Link>
          </div>
          {/* Navigation Bar Menu Options */}
          <div className="w-4/6 hidden md:block">
            <NavbarOptions></NavbarOptions>
          </div>
          {/* Search Bar */}
          <div className="w-1/6 hidden md:block">
            <Search />
          </div>
          <div className="block md:hidden">
            <WhiteAppButton
              Icon={<FaBars />}
              title="Menu"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>
        </SiteContainer>
      </nav>
      {/* </div> */}

      <SidebarWrapper
        sidebarOpen={sidebarOpen}
        onToggleSidebar={(open: boolean) => setSidebarOpen(open)}
        desktopWidth="256px"
        tabWidth={"256px"}
        mobileWidth={"256px"}
      >
      </SidebarWrapper>
    </>
  )
}

export default Navbar
