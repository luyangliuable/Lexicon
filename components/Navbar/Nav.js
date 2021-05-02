import Link from 'next/link';
import style from "./Navbar.module.css";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Nav() {
    return(
  <nav className="navbar navbar-expand-lg flex bg-transparent" id={style["main-nav"]}>
  <span className="text-7xl text-black font-serif">Lexicon</span>
  <div className="collapse navbar-collapse justify-end inline-flex">
    <ul className="navbar-nav">
    <li className="nav-item active">
        <Link href="/"><a className="nav-link" >ABOUT US</a></Link>
      </li>
      <li className="nav-item active">
        <Link href="/"><a className="nav-link">OUR SERVICES</a></Link>
      </li>
      <li className="nav-item active">
        <Link href="/"><a className="nav-link">LOGIN</a></Link>
      </li>
      <li className="nav-item active">
        <Link href="/"><a className="nav-link">REGISTER</a></Link>
      </li>
      <li className="nav-item active">
        <Link href="/"><a className="nav-link">CONTACT US</a></Link>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" id={style["nav-bar-search-bar"]} type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit" id={style["nav-bar-search-button"]}><FontAwesomeIcon icon={faSearch} /></button>
    </form>
  </div>
</nav>
    );
}

export default Nav; 