import style from "./footer.module.css";

function Footer() {
    return (
            <div className="footer">
            {/* Why is the footer not at the bottom?*/}
                © 2021 Copyright: 
                    <a className="text-blue-900 text-2xl font-serif">
                    {" "} Lexicon.com.au ( Monash Health Venture )
                    </a>
            </div>
    );
}

export default Footer;
