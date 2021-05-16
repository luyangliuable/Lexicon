import style from './footer.module.css';

function Footer() {
    return(
        <div>
            <footer className="bg-light text-center text-2xl relative bottom-0 left-0 right-0">
                <div className="text-center p-3 bg-gray-100 text-blue-900 font-serif">
                        © 2021 Copyright:
                    <a className = "text-blue-900 text-2xl font-serif"> Lexicon.com.au ( Monash Health Venture )</a>
                </div>
            </footer>
        </div>
    );
}

export default Footer;