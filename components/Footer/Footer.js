import style from './footer.module.css';

function Footer() {
    return(
        <div>
            <footer className="bg-light text-center text-lg-start absolute bottom-0 left-0 right-0">
                <div className="text-center p-3 bg-blue-900 text-white">
                        © 2021 Copyright:
                    <a className = "text-white"> Lexicon.com.au ( Monash Health Venture )</a>
                </div>
            </footer>
        </div>
    );
}

export default Footer;