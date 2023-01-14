import React, {useEffect, useState} from "react"

import DualPanelSectionWrapper from "../../DualPanelSectionWrapper"

const HeroSection = (props) => {
    const [ heroState, setHeroState ] = useState({
        opacity: 0,
        marginTop: 5,
        contentDisplay: [true, false]
    });

    const animateHero = (newState) => {
        const introInterval = setInterval(() => {

            setHeroState(prev => {
                return {
                    ...prev,
                    opacity: prev.opacity < newState.opacity ? prev.opacity + .1 : prev.opacity,
                    marginTop: prev.marginTop > newState.marginTop ? prev.marginTop - 1 : prev.marginTop
                }
            });

        }, 20);
    }

    const accordionClick = (index) => {
        setHeroState(prev => {

            const arr = [];
            for (var i = 0; i < 2; i++) {
                if ( i == index) {
                    arr.push(true);
                } else {
                    arr.push(false);
                }
            }

            return {
                ...prev,
                opacity: 0,
                marginTop: 10,
                contentDisplay: arr
            }
        })
        return;
    }

    useEffect(() => {
        setTimeout(() => animateHero({opacity: 1, marginTop: 0}), 500);
        let whichContent = 1;

        const switchAccordionInterval = setInterval(() => {
            whichContent = ( whichContent + 1 ) % 2;

            accordionClick(whichContent);
        }, 100000);
    }, [])

    return (
        <>
            <div className="hero" >
                <div style={{ ...props.style }}>
                    <div className="hero-holder search-engine" style={{
                        marginLeft: `${ props.scrolled }%`,
                        display: heroState.contentDisplay[0] ? "unset" : "none"
                    }}>
                        <div className="hero-content" style={{opacity: heroState.opacity, marginTop: `${heroState.marginTop}%`}}>
                            <h1 className="text-center md:text-left text-blue-900 font-bold text-5xl mb-6 ">
                                Australia's first medical search engine
                            </h1>
                            <p className="text-center md:text-left text-blue-900 text-lg">
                                This platform enables clinicians to take more efficient and
                                effective decisions by allowing them a quick and an easy access to
                                medical tools and documents.
                            </p>
                            <button className="landing-page-button disable-text-highlight">
                                Try Parsing Engine
                            </button>
                        </div>
                    </div>

                    <div className="hero-holder studio" style={{display: heroState.contentDisplay[1] ? true: "None"}}>
                        <div className="hero-content" style={{opacity: heroState.opacity, marginTop: `${heroState.marginTop}%`}}>
                            <h1 className="text-center md:text-left text-blue-900 font-bold text-5xl mb-6 ">
                                Medical Forms Fret No More!
                            </h1>
                            <p className="text-center md:text-left text-blue-900 text-lg">
                                Through the form builder, doctors can have any kinds of forms to suit their needs.
                            </p>
                            <button className="landing-page-button disable-text-highlight">
                                Try Form Builder
                            </button>
                        </div>
                    </div>
                </div>
                <div className="landing-page-hero-image" style={{filter: `grayscale(${ props.scrolled/2 }%)`, opacity: heroState.opacity}}></div>
            </div>
            <div className="accordion-button-holder">
                <div className="accordion-button-circle" onClick={() => accordionClick(0)} style={{background: heroState.contentDisplay[0] ? "#888" : "#E8E8E8"}}></div>
                <div className="accordion-button-circle" onClick={() => accordionClick(1)} style={{background: heroState.contentDisplay[1] ? "#888" : "#E8E8E8"}}></div>
            </div>
        </>
    )
}

export default HeroSection
