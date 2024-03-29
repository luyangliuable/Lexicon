import NavbarOptions from "../Navbar/NavbarOptions/navbarOptions";
import Search from "./Search";
import { WhiteAppButton } from "../AppButton"
import LexiconLogo from "../Logos/LexiconLogo"
import NavbarLinksWrapper from "./NavbarLinksWrapper"
import SiteContainer from "../utils/SiteContainer";
import Link from "next/link";
import SidebarWrapper from "../utils/SidebarWrapper"
import { FaBars } from "react-icons/fa";
import React, { useState, useEffect } from "react";

interface NavbarProp {
    pageId: string
}

interface NavbarState {
    scrolled: number;
    detached: boolean;
}

/**
 * Navbar component
 * @param pageId - Current page id
 * @returns {JSX.Element} - navigation bar
 */
const Navbar: React.FC<NavbarProp, NavbarState> = ({ pageId }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [objectState, setObjectState] = useState({
        scrolled: 0,
        detached: false
    })

    /**
     * Update scroll amount to state based on scroll
     *
     * @param {number} scrollAmount - scrolled amount
     */
    const updateScrollAmount = (scrollAmount: number) => {
        setObjectState(prev => {
            return {
                ...prev,
                scrolled: scrollAmount
            };
        });
    };

    /**
     * Get the height of the navbar
     *
     * @returns {number} - height of the navbar
     */
    const getNavbarHeight = () => {
        const navBarHeight = document.getElementsByClassName('navbar')[0].getBoundingClientRect().height;
        return navBarHeight;
    };


    /**
     * Check if the navigation bar should be detached after scrolling past it.
     *
     * @param {number} scrollAmount - scrolled amount
     */
    const checkNavBarIsDetached = (scrollAmount: number) : void => {
        // Get the height of the navbar
        const navBarHeight = getNavbarHeight();
        // Check if the scroll amount is greater than the navbar height
        const isDetached = scrollAmount > navBarHeight;

        // Get the navbar element
        const navbar = document.getElementsByClassName('navbar')[0];

        // Toggle the "detached" class on the navbar element
        navbar.classList.toggle("detached", isDetached);

        // Update the object state
        setObjectState(prev => {
            return {
                ...prev,
                detached: isDetached
            };
        });
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
            <nav className="top-0 left-0 bg-white border-b z-10 navbar-container">
                <SiteContainer className="flex items-center navbar">

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
                    <div className="w-2/6 md:block">
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
            </SidebarWrapper>
        </>
    )
}

export default Navbar
