import Link from "next/link";
import React from "react";

import { NavbarLinkType } from "./types"

interface iDesktopNavbarLink {
    link: NavbarLinkType
    selected: boolean
}


const DesktopNavbarLink: React.FC<iDesktopNavbarLink> = ({
    link,
    selected,
}) => {
    return (
        <div className="ml-4 cursor-pointer">
            <Link href={link.href}>
                <p
                    className={` rounded-full ${
                selected
                ? "bg-blue-900 px-3 leading-none py-1 text-white"
                : "text-blue-900 font-medium"
            }`}
                >
                    {link.title}
                </p>
            </Link>
        </div>
    )
}

export default DesktopNavbarLink
