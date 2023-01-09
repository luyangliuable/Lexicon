import NavbarOptions from "../Navbar/NavbarOptions/navbarOptions.tsx";
import Search from "./Search"
import DesktopNavbarLink from "./DesktopNavbarLink"
import { WhiteAppButton } from "../AppButton/buttons"
import LexiconLogo from "../Logos/LexiconLogo"
import NavbarLinksWrapper from "./NavbarLinksWrapper"
import SiteContainer from "../utils/SiteContainer";
import Link from "next/link";
import SidebarWrapper from "../utils/SidebarWrapper"
import { FaBars } from "react-icons/fa";
import React, { useState, useEffect } from "react";

interface iNavbar {
    pageId: string
}

const Navbar: React.FC<iNavbar> = ({ pageId }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [objectState, setObjectState] = useState({
        scrolled: 0,
        detached: false
    })

    const updateScrollAmount = (scrollAmount: number) => {
        /*
         * Update scroll amount to state based on scroll
         *
         * Parameters:
         *  scrolledAmount (number): scrolled amount
         */
        setObjectState(prev => {
            return {
                ...prev,
                scrolled: scrollAmount
            };
        });
    };


    const getNavbarHeight = () => {
        /*
         * Get the height of the navbar
         */
        const navBarHeight = document.getElementsByClassName('navbar')[0].getBoundingClientRect().height;
        return navBarHeight;
    };

    const checkNavBarIsDetached = (scrollAmount) => {
        /*
         * Check if the navigation bar should be detached after scrolling past it.
         *
         * Parameters:
         *  scrolledAmount (number): scrolled amount
         */
        const navBarHeight = getNavbarHeight();

        if (scrollAmount > navBarHeight && objectState.detached != true) {
            document.getElementsByClassName('navbar')[0].classList.add("detached");

            setObjectState(prev => {
                return {
                    ...prev,
                    detached: true
                };
            });

        } else if (scrollAmount <= navBarHeight)  {
            document.getElementsByClassName('navbar')[0].classList.remove("detached");

            setObjectState(prev => {
                return {
                    ...prev,
                    detached: false
                };
            });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', function() {
            const scrollAmount = window.scrollY;
            const newState = {};

            updateScrollAmount(scrollAmount);
            checkNavBarIsDetached(scrollAmount);
        }, false);
    }, []);

    return (
        <>
            {/* <div className="sticky top-0 left-0 bg-white border-b z-40" style={{background: 'red', position: "absolute", width: "100vw"}}> */}
            <nav className="top-0 left-0 bg-white border-b z-10 navbar-container">
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

                <SiteContainer className="flex items-center justify-around text-blue-900 navbar">
                    {/* Lexicon Logo */}
                    <Link href="/">
                        <div className="flex items-center w-1/6 h-max">
                            <LexiconLogo />
                        </div>
                    </Link>
                    {/* Navigation Bar Menu Options */}
                    <div className="w-3/6 hidden md:block">
                        <NavbarOptions></NavbarOptions>
                    </div>
                    {/* Search Bar */}
                    <div className="w-2/6 hidden md:block">
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
