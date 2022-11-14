import Link from "next/link";

function navbarOptions() {
    return (<div className="flex justify-start">
        <Link href="/parsing_engine"><div className="text-lg cursor-pointer border-b-2 border-transparent hover:border-blue-900 p-1 mx-2">Parsing Engine</div></Link>
        <Link href="lexicon_studio"><div className="text-lg cursor-pointer border-b-2 border-transparent hover:border-blue-900 p-1 mx-2">Studio</div></Link>
    </div>)
}

export default navbarOptions;