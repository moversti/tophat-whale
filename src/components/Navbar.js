import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { ProductConsumer } from '../context';
import 'bootstrap';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link to="/" className="nav-link mr-auto navbar-brand" id="nav-logo">
        <img src={logo} alt="Tophat Whale logo" height="40" />
        <span className="d-none d-md-inline">Tophat Whale</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarToggler"
      >
        <Link to="/about" className="nav-link">
          Tietoa meistä
        </Link>
        <Link to="/login" className="nav-link">
          Kirjaudu sisään
        </Link>
        <ProductConsumer>
          {value => {
            return (
              <Link to="/kori" className="nav-link">
                Ostoskori ({value.cart.length})
              </Link>
            );
          }}
        </ProductConsumer>
      </div>
    </nav>
  );
}
export default Navbar;
