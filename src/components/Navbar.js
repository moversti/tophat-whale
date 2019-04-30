import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../logo.svg';
function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/' className="nav-link mr-auto navbar-brand" id='nav-logo'>
            <img src={logo} alt='Tophat Whale logo' height='40' />
            Tophat Whale
            </Link>
            <Link to='/about' className="nav-link">
            Tietoa meistä
            </Link>
            <Link to='/kori' className="nav-link">
            Ostoskori (0)
            </Link>
        </nav>
    )
}
export default Navbar