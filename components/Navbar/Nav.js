import Link from "next/link";
import style from "./Navbar.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Nav() {
  return (
    <div className="">
      {/* Navbar upper section */}
      <div className="w-screen bg-white h-16 flex justify-between fixed top-0 border-b-2 border-blue-900">
        {/* Brand Logo */}
        <div className="w-1/2 h-full inline-flex">
          <div className="text-blue-900 text-6xl font-serif mx-4 my-1 flex-1">
            <Link href="/homepage">
              <div className="display: inline-block focus: cursor-pointer">Lexicon</div>
            </Link>
          </div>
        </div>
        {/* Search Bar Section */}
        <div className="w-1/2 h-full inline-flex flex-row-reverse">
          <div className="w-3/6 h-full inline-flex">
            <div className="flex-1 my-2">
              {/* Search Bar */}
              <div className="w-4/5 h-full inline-flex border-2 border-blue-900 rounded-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-2.5 border-none border-blue-900 rounded-full focus:outline-none focus:ring-4"
                />
              </div>
              {/* Search Bar Button */}
              <div className="w-1/5 h-full inline-flex">
                <FontAwesomeIcon
                  className="text-2xl text-blue-900 relative top-1 left-3 focus: cursor-pointer"
                  icon={faSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar lower section */}
      <div className="w-screen bg-gray-100 h-14 flex justify-between mt-16">
        {/* About Us - Our Services - Contact Us */}
        <div className=" w-5/12 h-full inline-flex">
          <div className="flex-1 w-full">
            <div
              className="
          text-blue-900 border-2 rounded-xl focus: cursor-pointer
          mx-2 my-2 py-1 text-center hover:bg-gray-300
          text-xl font-semibold border-blue-900"
            >
              About Us
            </div>
          </div>

          <div className="flex-1 w-full">
            <div
              className="
          text-blue-900 border-2 rounded-xl focus: cursor-pointer
           mx-2 my-2 py-1 text-center hover:bg-gray-300
          text-xl font-semibold border-blue-900 hover:cursor-pointer"
            >
              Our Services
            </div>
          </div>

          <div className="flex-1 w-full">
            <div
              className="
          text-blue-900 border-2 rounded-xl focus: cursor-pointer
          mx-2 my-2 py-1 text-center hover:bg-gray-300
          text-xl font-semibold border-blue-900 hover:cursor-pointer"
            >
              Contact Us
            </div>
          </div>

          <div className="flex-1 w-full">
            <Link href="/test">
              <div
                className="
          text-blue-900 border-2 rounded-xl focus: cursor-pointer
          mx-2 my-2 py-1 text-center hover:bg-gray-300
          text-xl font-semibold border-blue-900 hover:cursor-pointer"
              >
                Test
              </div>
            </Link>
          </div>
        </div>

        {/* Login - Register */}
        <div className="inline-flex w-2/12 h-full">
          <div className="flex-1 w-3/6">
            <div
              className="
          text-blue-900 border-2 rounded-xl focus: cursor-pointer
           mx-2 my-2 py-1 text-center hover:bg-gray-300
          text-xl font-semibold border-blue-900 hover:cursor-pointer"
            >
              Login
            </div>
          </div>

          <div className="flex-1 w-3/6">
            <div
              className="
          text-blue-900 border-2 rounded-xl focus: cursor-pointer
          mx-2 my-2 py-1 text-center hover:bg-gray-300
          text-xl font-semibold border-blue-900 hover:cursor-pointer"
            >
              Register
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
