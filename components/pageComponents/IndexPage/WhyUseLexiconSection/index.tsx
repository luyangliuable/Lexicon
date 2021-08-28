import React from "react";
import style from "./WhyUseLexiconSection.module.css";

const WhyUseLexiconSection = () => {
    return (    <div>
        <div className="bg-white h-70vh w-full">
          {/* Title */}
          <div className="w-full h-1/5 text-center">
            <span className="text-5xl text-blue-900 relative top-8 font-bold">
              Why Choose Lexicon ?
            </span>
          </div>
          {/* Content */}
          <div className="w-full h-4/5 flex flex-row">
            {/* First Block */}
            <div className="h-full w-1/3 flex-1">
              <div className="w-full h-4/5 flex justify-center relative top-20">
                <div id={style["first-section"]} className="h-3/5 w-3/4"></div>
              </div>
              <div className="w-full h-1/5 text-center">
                <span className="text-4xl text-blue-900 relative top-1 font-bold">
                  Time Savings
                </span>
              </div>
            </div>
            {/* Second Block */}
            <div className="h-full w-1/3 flex-1">
              <div className="w-full h-4/5 flex justify-center relative top-20">
                <div id={style["second-section"]} className="h-3/5 w-3/4"></div>
              </div>
              <div className="w-full h-1/5 text-center">
                <span className="text-4xl text-blue-900 relative top-1 font-bold">
                  Easy Access
                </span>
              </div>
            </div>
            {/* Third Block */}
            <div className="h-full w-1/3 flex-1">
              <div className="w-full h-4/5 flex justify-center relative top-20">
                <div id={style["third-section"]} className="h-3/5 w-3/4"></div>
              </div>
              <div className="w-full h-1/5 text-center">
                <span className="text-4xl text-blue-900 relative top-1 font-bold">
                  Quick Search
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white h-10vh w-full flex justify-center">
          <div className="text-xl text-blue-900 font-bold border-2 p-2 border-blue-900 inline-flex h-12 hover:bg-gray-300 focus: cursor-pointer">
            Learn more about our latest guidelines.
          </div>
        </div>
      </div>)
}

export default WhyUseLexiconSection;