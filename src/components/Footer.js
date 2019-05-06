import React from 'react'
import {Link} from 'react-router-dom'
function Footer(){
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-light fixed-bottom">
            <span className='mr-auto'>&#169;Mikko Översti 2019</span>
            <Link to='/tophat-whale/contact' className="nav-link">
            Ota yhteyttä
            </Link>
        </nav>
    )
}
export default Footer