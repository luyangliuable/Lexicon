import React, {useEffect, useState} from "react";
import HeroSection from "./HeroSection";
import PanelSection from "./PanelSection";
import WhyUseLexiconSection from "./WhyUseLexiconSection";
import Footer from "./Footer/index";
import { iView } from "./types";


const View = () => {
    const INITNUMBER = Math.NaN;
    const NUMBEROFSLIDES = 4;

    const [ objectState, setObjectState ] = useState({
        scrolled: INITNUMBER,
        navbarHeight: INITNUMBER,
        heroComputedHeight: INITNUMBER,
        slideComputedHeight: Array(NUMBEROFSLIDES).fill(INITNUMBER),
        slideOpacity: Array(NUMBEROFSLIDES).fill(0),
        slideLeft: Array(NUMBEROFSLIDES).fill(0),
        slideOffsets: [.5, .7, .8, .85], // This is optional so ignore for now.
        detached: false
    });


    const computeOpacity = (prev, scrollAmount, whichSlide, offset) => {
        /*
         * Computes the opacity of each slide element on landing page based on scroll position.
         * Parameters:
         *  prev ({string: any}): previous state
         *  scrolledAmount (number): scrolled amount
         *  whichSlide (number): which slide element to compute
         *  offset (number): abitrary offset
         *
         *  Returns (number): The slide opacity based on scroll amount in page.
         */
        const speed = 250;
        const reachedElementInPage = prev.slideComputedHeight[whichSlide]*offset < scrollAmount;
        const slideRenderOpacity = ( scrollAmount - prev.slideComputedHeight[whichSlide]*offset) / speed;
        return reachedElementInPage ? slideRenderOpacity : 0;
    };

    const computeLeft = (prev, scrollAmount, whichSlide, offset) => {
        /*
         * Computes the left of each slide element on landing page based on scroll position.
         * Parameters:
         *  prev ({string: any}): previous state
         *  scrolledAmount (number): scrolled amount
         *  whichSlide (number): which slide element to compute
         *  offset (number): abitrary offset
         *
         *  Returns (number): The slide left based on scroll amount in page.
         */
        const startingLeft = 100;

        const reachedElementInPage = prev.slideComputedHeight[whichSlide]*offset  < scrollAmount;
        const scrolledAnimationFinished = startingLeft - ( scrollAmount - prev.slideComputedHeight[whichSlide]*offset) >= 0;
        const slideRenderLeftAmount =  startingLeft - ( scrollAmount - prev.slideComputedHeight[whichSlide]*offset);

        return ( reachedElementInPage && scrolledAnimationFinished ) ? `${slideRenderLeftAmount}px` : '0px';
    };


    const updateScrollAmount = (scrollAmount) => {
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


    const computeSlideStyleBasedOnScrollAmount = (scrollAmount) => {
        /*
         * compute the slide element on landing page based on the scroll amount.
         *
         * Parameters:
         *  scrolledAmount (number): scrolled amount
         */
        setObjectState(prev => {
            return {
                ...prev,
                navbarHeight: document.getElementsByClassName('navbar')[0].getBoundingClientRect().height,
                slideOpacity: Array(NUMBEROFSLIDES).fill(0).map((_, index) => {
                    return computeOpacity(prev, scrollAmount, index, objectState.slideOffsets[index]);
                }),
                slideLeft: Array(NUMBEROFSLIDES).fill(0).map((_, index) => {
                    return computeLeft(prev, scrollAmount, index, objectState.slideOffsets[index]);
                })
            };
        });
    };

    const computePageElementHeights = () => {
        /*
         * Compute the page element heights at the begining.
         */
        setObjectState(prev => {
            return {
                ...prev,
                heroComputedHeight: document.getElementsByClassName('hero')[0].offsetHeight,
                slideComputedHeight: Array(NUMBEROFSLIDES).fill(0).map((_, index) => {
                    return document.getElementById(`image-${ index + 1 }`).getBoundingClientRect().top;
                }),
            };
        });
    };

    useEffect(function(e){

        window.addEventListener('scroll', function() {
            const scrollAmount = window.scrollY;
            const newState = {};

            updateScrollAmount(scrollAmount);
            computeSlideStyleBasedOnScrollAmount(scrollAmount);
        }, false);

        computePageElementHeights();

    }, []);

    return (
        <>
          <div className="wallpaper" style={{
              top: `${ objectState.scrolled/50 }px`,
              filter: `blur(${ Math.min( objectState.scrolled/200, 3 ) }px)`
          }}></div>
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


          <div className="landing-page-slide-section">
            <div className="w-full h-full bg-cover bg-no-repeat bg-center landing-page-slide-section-image" id="image-3"
                 style={{
                     backgroundImage: "url('homepage/doctors.jpg')",
                     marginLeft: objectState.slideLeft[2],
                     opacity: objectState.slideOpacity[2]
                 }}
            />

            <div className="slide-section-text">
              <p>Validated information</p>
              <h2 style={{fontWeight: 100}}>For Medical Professional</h2>
            </div>
          </div>

          <div className="landing-page-slide-section">
            <div className="w-full h-full bg-cover bg-no-repeat bg-center landing-page-slide-section-image" id="image-4"
                 style={{
                     backgroundImage: "url('homepage/med-info.jpg')",
                     marginLeft: objectState.slideLeft[3],
                     opacity: objectState.slideOpacity[3]
                 }}
            />

            <div className="slide-section-text">
              <p>Swift and easy access to</p>
              <h2 style={{fontWeight: 100}}>HEALTH INFORMATION</h2>
            </div>
          </div>

          <PanelSection />
          <WhyUseLexiconSection />
          <Footer />
        </>

    );
};

export default View;
