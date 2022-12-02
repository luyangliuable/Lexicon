import React, {useEffect, useState} from "react";
import HeroSection from "./HeroSection";
import PanelSection from "./PanelSection";
import WhyUseLexiconSection from "./WhyUseLexiconSection";
import Footer from "./Footer/index";
import { iView } from "./types";

const View= () => {
    const [ objectState, setObjectState ] = useState({
        scrolled: 0,
        navbarHeight: 1000,
        heroComputedHeight: 1000,
        slideComputedHeight: [ 1000, 1000, 1000, 1000 ],
        slideOpacity: [0, 0],
        slideLeft: [0, 0],
        detached: false
    });


    const computeOpacity = (prev, scrollAmount, whichSlide, offset) => {
        const speed = 250;
        // const offset = .85;
        return prev.slideComputedHeight[whichSlide]*offset < scrollAmount ? ( scrollAmount - prev.slideComputedHeight[whichSlide]*offset) / speed : 0;
    };

    const computeLeft = (prev, scrollAmount, whichSlide, offset) => {
        const startingLeft = 100;
        // const offset = .85;
        return prev.slideComputedHeight[whichSlide]*offset < scrollAmount &&  startingLeft - ( scrollAmount - prev.slideComputedHeight[whichSlide]*offset) >= 0  ? `${ startingLeft -( scrollAmount - prev.slideComputedHeight[whichSlide]*offset) }px` : '0px';
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

            const navBarHeight = document.getElementsByClassName('navbar')[0].getBoundingClientRect().height;

            setObjectState(prev => {
                return {
                    ...prev,
                    navbarHeight: document.getElementsByClassName('navbar')[0].getBoundingClientRect().height,
                    slideOpacity: [
                        computeOpacity(prev, scrollAmount, 0, .5),
                        computeOpacity(prev, scrollAmount, 1, .7),
                        computeOpacity(prev, scrollAmount, 2, .8),
                        computeOpacity(prev, scrollAmount, 3, .85),
                    ],
                    slideLeft: [
                        computeLeft(prev, scrollAmount, 0, .5),
                        computeLeft(prev, scrollAmount, 1, .7),
                        computeLeft(prev, scrollAmount, 2, .8),
                        computeLeft(prev, scrollAmount, 3, .85)
                    ]
                };
            });


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

        }, false);

        setObjectState(prev => {
            return {
                ...prev,
                heroComputedHeight: document.getElementsByClassName('hero')[0].offsetHeight,
                slideComputedHeight: [
                    document.getElementById(`image-${ 1 }`).getBoundingClientRect().top,
                    document.getElementById(`image-${ 2 }`).getBoundingClientRect().top,
                    document.getElementById(`image-${ 3 }`).getBoundingClientRect().top,
                    document.getElementById(`image-${ 4 }`).getBoundingClientRect().top
                ]
            };
        });

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
