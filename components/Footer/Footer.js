import style from './footer.module.css';

function Footer() {
    return(
        <div>
            <footer className="bg-light text-center text-2xl relative bottom-0 left-0 right-0">
                <div className="text-center p-3 bg-white text-black font-serif">
                        © 2021 Copyright:
                    <a className = "text-black text-2xl font-serif"> Lexicon.com.au ( Monash Health Venture )</a>
                </div>
            </footer>
        </div>
    );
}

export default Footer;