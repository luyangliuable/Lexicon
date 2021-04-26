import Link from 'next/link';
import style from "./Navbar.module.css";
import { ReactElement } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Nav() {
    return(
  <nav className="navbar navbar-expand-lg flex bg-blue-900">
  <a className="text-5xl text-gray-100 hover:underline hover:text-gray-100" href="/">Lexicon +</a>
  <div className="collapse navbar-collapse justify-end inline-flex">
    <ul className="navbar-nav">
    <li className="nav-item active">
        <Link href="/"><a className="nav-link" >About Us</a></Link>
      </li>
      <li className="nav-item active">
        <Link href="/"><a className="nav-link">Our Services</a></Link>
      </li>
      <li className="nav-item active">
        <Link href="/"><a className="nav-link">Login</a></Link>
      </li>
      <li className="nav-item active">
        <Link href="/"><a className="nav-link">Register</a></Link>
      </li>
      <li className="nav-item active">
        <Link href="/"><a className="nav-link">Contact Us</a></Link>
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