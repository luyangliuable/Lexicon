import style from "./footer.module.css";

/**
 *  Footer component
 *
 *  @returns {JSX.Element} - A div with a copyright message and a link to the website
 */
function Footer() {
    return (
        <div className={style.footer}>
            {/**
            * @desc Displaying the copyright message
            */}
            © 2021 Copyright:
            {" "} Lexicon.com.au ( Monash Health Venture )
        </div>
    );
}

export default Footer;
