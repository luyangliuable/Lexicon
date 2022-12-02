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
        slideComputedHeight: [ 1000, 1000, 1000, 1000 ],
        slideOpacity: [0, 0],
        slideLeft: [0, 0]
    });


    const computeOpacity = (prev, scrollAmount, whichSlide) => {
        return prev.slideComputedHeight[whichSlide]*.65 < scrollAmount ? ( scrollAmount - prev.slideComputedHeight[whichSlide]*.65) / 250 : 0;
    };

    const computeLeft = (prev, scrollAmount, whichSlide) => {
        return prev.slideComputedHeight[whichSlide]*.65 < scrollAmount &&  100 - ( scrollAmount - prev.slideComputedHeight[whichSlide]*.65) >= 0  ? `${ 100 -( scrollAmount - prev.slideComputedHeight[whichSlide]*.65) }px` : '0px';
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
                    slideOpacity: [ computeOpacity(prev, scrollAmount,0), computeOpacity(prev, scrollAmount, 1)],
                    slideLeft: [computeLeft(prev, scrollAmount, 0) , computeLeft(prev, scrollAmount, 1)]
                };
            });

        }, false);

        setObjectState(prev => {
            return {
                ...prev,
                heroComputedHeight: document.getElementsByClassName('hero')[0].offsetHeight,
                slideComputedHeight: [document.getElementById(`image-${ 1 }`).getBoundingClientRect().y, document.getElementById(`image-${ 2 }`).getBoundingClientRect().y]
            };
        });

    }, []);

    return (
        <>
          <div className="wallpaper" style={{top: `${ objectState.scrolled/50 }px`}}></div>
          <HeroSection style={{opacity: 1-objectState.scrolled/292}} scrolled={objectState.scrolled} />

          <div className="landing-page-slide-section">
            <div className="w-full h-full bg-cover bg-no-repeat bg-center landing-page-slide-section-image" id="image-1"
                 style={{
                     backgroundImage: "url('homepage/research.jpg')",
                     marginLeft: objectState.slideLeft[0],
                     opacity: objectState.slideOpacity[0]
                 }}
            />

            <div className="slide-section-text">
              <p>A repository for</p>
              <h2 style={{fontWeight: 100}}>RESEARCH RELATED INFORMATION</h2>
            </div>
          </div>

          <div className="landing-page-slide-section">
            <div className="w-full h-full bg-cover bg-no-repeat bg-center landing-page-slide-section-image" id="image-2"
                 style={{
                     backgroundImage: "url('homepage/data-privacy.jpg')",
                     marginLeft: objectState.slideLeft[1],
                     opacity: objectState.slideOpacity[1]
                 }}
            />

            <div className="slide-section-text">
              <p>We ensure your</p>
              <h2 style={{fontWeight: 100}}>DATA PRIVACY</h2>
            </div>
          </div>

          <PanelSection />
          <WhyUseLexiconSection />
          <Footer />
        </>
    );
};

export default View;
