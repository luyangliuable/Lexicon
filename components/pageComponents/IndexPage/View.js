import React, {useEffect, useState} from "react";
import HeroSection from "./HeroSection";
import PanelSection from "./PanelSection";
import WhyUseLexiconSection from "./WhyUseLexiconSection";
import Footer from "./Footer/index";
import { iView } from "./types";

const View= () => {
    const [ objectState, setObjectState ] = useState({
        scrolled: 0,
        heroComputedHeight: 1000,
        slideOneOpacity: 0
    });

    const computeLeftStyle = (scrollAmount, start, end, referenceStart) => {
        // TODO use function instead hard coding queries
        const actual  = scrollAmount - referenceStart*.5;
        const res = ( start - actual ) >= end ? start - actual : 0;
        return res;
    };

    useEffect(function(e){
        window.addEventListener('scroll', function() {
            var scrollAmount = window.scrollY;

            var newState = {};

            newState.scrolled = scrollAmount;

            setObjectState(prev => {
                return {
                    ...prev,
                    scrolled: scrollAmount
                };
            });

            setObjectState(prev => {
                return {
                    ...prev,
                    slideOneOpacity: prev.heroComputedHeight*.7 < scrollAmount ? ( scrollAmount - prev.heroComputedHeight*.7) / 200 : 0,
                    slideOneLeft: prev.heroComputedHeight*.7 < scrollAmount &&  70 - ( scrollAmount - prev.heroComputedHeight*.7) >= 0  ? `${ 70 -( scrollAmount - prev.heroComputedHeight*.7) }px` : '0px',
                };
            });

        }, false);

        setObjectState(prev => {
            return {
                ...prev,
                heroComputedHeight: document.getElementsByClassName('hero')[0].offsetHeight
            };
        });

    }, []);

    return (
        <>
          <div className="wallpaper" style={{top: `${ objectState.scrolled/4 }px`}}></div>
          <HeroSection style={{opacity: 1-objectState.scrolled/292}} scrolled={objectState.scrolled} />
          <div className="landing-page-slide-section">
            <div className="w-full h-full bg-cover bg-no-repeat bg-center"
                 style={{
                     backgroundImage: "url('homepage/research.jpg')",
                     width: "580px",
                     height: "40vw",
                     marginLeft: objectState.slideOneLeft,
                     opacity: objectState.slideOneOpacity
                 }}
            />
          </div>
          <PanelSection />
          <WhyUseLexiconSection />
          <Footer />
        </>
    );
};

export default View;
