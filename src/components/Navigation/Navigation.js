import { React } from 'react';
import './Navigation.css';

function Navigation({
  isLoggedIn, onLogout, onSignUpClick, onLoginClick
}) {
  return (
    <nav className="navigation">
      {isLoggedIn ? (
        <ul className="navigation__list">
          <li>
            <a className="navigation__link" href="#home">Home</a>
          </li>
          <li>
            <a className="navigation__link" href="#savedarticles">Saved Articles</a>
          </li>
          <li>
            <button className="navigation__button" type="button" onClick="onLogout">Log Out</button>
          </li>
        </ul>
      ) : (
        <ul className="navigation__list">
          <li>
            <button className="navigation__button" type="button" onClick="onLoginClick">Log In</button>
          </li>
          <li>
            <button className="navigation__button" type="button" onClick="onSignUpClick">Sign Up</button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
