import React, { useState } from "react"
import { FaBars } from "react-icons/fa"

import { WhiteAppButton } from "../AppButton/buttons"
import LexiconLogo from "../Logos/LexiconLogo"
import SidebarWrapper from "../utils/SidebarWrapper"
import SiteContainer from "../utils/SiteContainer"
import DesktopNavbarLink from "./DesktopNavbarLink"
import NavbarLinksWrapper from "./NavbarLinksWrapper"
import Search from "./Search"

interface iNavbar {
  pageId: string
}

const Navbar: React.FC<iNavbar> = ({ pageId }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 left-0 bg-white shadow border-b z-40">
        <div className="bg-gray-200 hidden md:block">
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
        <SiteContainer className="flex items-center justify-between py-4 text-blue-900">
          <div>
            <LexiconLogo size={100} />
          </div>
          <div className="hidden md:block">
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

      <SidebarWrapper
        sidebarOpen={sidebarOpen}
        onToggleSidebar={(open: boolean) => setSidebarOpen(open)}
        desktopWidth="256px"
        tabWidth={"256px"}
        mobileWidth={"256px"}
      >
        <div>dsadsada</div>
      </SidebarWrapper>
    </>
  )
}

export default Navbar
