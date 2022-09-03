import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import '../../blocks/wrapper/wrapper.css';
import logo from '../../images/logo.svg';

function Header() {
  return (
    <header className="header wrapper_type_small">
      <img className="header__logo" src={logo} alt="logo" />
      <Navigation />
    </header>
  );
}

export default Header;
