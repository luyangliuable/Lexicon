import Link from "next/link";
import React from 'react';

const navbarOptions: React.FC = () => {

    function show() {
        var element = document.getElementsByClassName('dropdown');
        element[0].style.display = "block";
    }

    function hide() {
        var element = document.getElementsByClassName('dropdown');
        element[0].style.display = "None";
    }

    return (
        <div className="flex justify-start">
            <div onMouseOver={() => show()} onMouseLeave={() => hide() }>
                <Link href="/parsing_engine"><div className="
                    text-lg
                    cursor-pointer
                    border-b-2
                    border-transparent
                    hover:border-blue-900
                    p-1
                    mx-2
                    ">Parsing Engine</div></Link>
            <div className="dropdown">
                <Link href="/parsing_engine">
                    <div className="dropdown-item">Upload</div>
                </Link>
                    <div className="dropdown-item">Search</div>
                </div>
            </div>
            <Link href="lexicon_studio"><div className="
                text-lg
                cursor-pointer
                border-b-2
                border-transparent
                hover:border-blue-900
                p-1
                mx-2
                ">Studio</div></Link>
        </div>);
}

export default navbarOptions;
