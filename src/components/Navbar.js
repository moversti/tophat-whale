import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../logo.svg';
import {ProductConsumer} from '../context'

function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/tophat-whale/' className="nav-link mr-auto navbar-brand" id='nav-logo'>
            <img src={logo} alt='Tophat Whale logo' height='40' />
            Tophat Whale
            </Link>
            <Link to='/tophat-whale/about' className="nav-link">
            Tietoa meistä
            </Link>
            <ProductConsumer>
                {value=>{
                    return (
                        <Link to='/tophat-whale/kori' className="nav-link">
                        Ostoskori ({value.cart.length})
                        </Link>
                    )
                }}
            </ProductConsumer>

        </nav>
    )
}
export default Navbar