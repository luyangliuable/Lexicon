import React, {useEffect, useState} from "react"

import DualPanelSectionWrapper from "../../DualPanelSectionWrapper"

const HeroSection = () => {

    const getScrollLocation = () => {
        console.log("Scroll");
    };


    useEffect(() => {
        // Client-side-only code
        window.onscroll = (e) => {
            var scrolled = window.scrollY;
            console.log(scrolled);
        };
    })

    const [ heroState, setHeroState ] = useState({
        opacity: 0,
        marginTop: 12,
    });

    const animateHero = (newState) => {
        const timer = setInterval(() => {

            setHeroState(prev => {
                if (prev.opacity >= newState.opacity || prev.marginTop <= newState.top) {
                    clearInterval(timer);
                    return {
                        ...prev
                    };
                }

                return {
                    ...prev,
                    opacity: prev.opacity + .1,
                    marginTop: prev.marginTop - 1
                };
            });
        }, 20);
    }

    useEffect(() => {
        setTimeout(() => animateHero({opacity: 1, marginTop: 0}), 500);
    }, [])


    return (
        <>
            <div className="hero">
                <div className="hero-content" style={{opacity: heroState.opacity, marginTop: `${heroState.marginTop}%`}}>
                    <h1 className="text-center md:text-left text-blue-900 font-bold text-5xl mb-6 ">
                        Australia's first medical search engine
                    </h1>
                    <p className="text-center md:text-left text-blue-900 text-lg">
                        This platform enables clinicians to take more efficient and
                        effective decisions by allowing them a quick and an easy access to
                        medical tools and documents.
                    </p>
                    <div className="landing-page-button disable-text-highlight">
                        Try Parsing Engine
                    </div>
                </div>

            </div>
            <div className="accordion-button-holder">
                <div className="accordion-button-circle"></div>
                <div className="accordion-button-circle"></div>
            </div>
        </>
    )
}

export default HeroSection
