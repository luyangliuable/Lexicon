import React from "react"
import { InternalLinks } from "../../urls"
import { NavbarLinkType } from "./types"

interface iNavbarLinksWrapper {
  children: (data: NavbarLinkType[]) => any
}

const NavbarLinksWrapper: React.FC<iNavbarLinksWrapper> = ({ children }) => {
  const data: NavbarLinkType[] = [
    {
      title: "Home",
      id: "home",
      href: InternalLinks.home,
    },
    {
      title: "Our service",
      id: "our-service",
      href: InternalLinks.ourServices,
    },
  ]
  return <>{children(data)}</>
}

export default NavbarLinksWrapper
