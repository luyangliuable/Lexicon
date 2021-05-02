import style from "./secondSection.module.css";

export default function HomePageSecondSection() {
  return (
    <div className="h-100vh w-100vw">
      <div className="w-screen text-6xl font-serif flex justify-center mt-20 absolute">
        OUR VALUES
      </div>
      <div className="flex justify-center h-3/4 w-screen mt-20vh absolute">
        <div className="absolute h-70vh w-70vw ">

          {/* First Card */}
          <div className="w-2/6 h-full inline-block relative bottom-12">
            
            {/* Image Area */}
            <div className="w-full h-2/4">
              <div className="rounded-full w-80 h-80 ml-16 mt-8 bg-red-900 absolute shadow-2xl border-8" id={style["first-card-image"]}></div>
            </div>
            {/* Image Area */}

            {/* Text area */}
            <div className="w-full h-2/4 p-8 text-xl font-serif italic font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
            </div>
            {/* Text area */}

          </div>
          {/* First Card */}

          {/* Second Card */}
          <div className="w-2/6 h-full inline-block relative bottom-12">

            {/* Image Area */}
            <div className="w-full h-2/4">
              <div className="rounded-full w-80 h-80 ml-16 mt-8 bg-red-900 absolute shadow-2xl border-8" id={style["second-card-image"]}></div>
            </div>
            {/* Image Area */}

            {/* Text area */}
            <div className="w-full h-2/4 p-8 text-xl font-serif italic font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
            </div>
            {/* Text area */}

          </div>

          {/* Third  Card */}
          <div className="w-2/6 h-full inline-block relative bottom-12">

             {/* Image Area */}
             <div className="w-full h-2/4">
              <div className="rounded-full w-80 h-80 ml-16 mt-8 bg-red-900 absolute shadow-2xl border-8" id={style["third-card-image"]}></div>
            </div>
            {/* Image Area */}

            {/* Text area */}
            <div className="w-full h-2/4 p-8 text-xl font-serif italic font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
            </div>
            {/* Text area */}

          </div>
        </div>
      </div>
    </div>
  );
}
