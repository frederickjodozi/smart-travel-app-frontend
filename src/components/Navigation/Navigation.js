import { React } from 'react';
import './Navigation.css';
import homeIcon from '../../images/homeIcon.svg';
import articlesIcon from '../../images/articlesIcon.svg';

function Navigation({
  isLoggedIn, onLogout, onSignUpClick, onLoginClick
}) {
  return (
    <nav className="navigation">
      {isLoggedIn ? (
        <ul className="navigation__list">
          <li className="navigation__item">
            <img src={homeIcon} className="navigation__icon" aria-label="home" />
            <a className="navigation__link" href="#home">Home</a>
          </li>
          <li className="navigation__item">
            <img src={articlesIcon} className="navigation__icon" aria-label="saved articles" />
            <a className="navigation__link" href="#savedarticles">Saved Articles</a>
          </li>
          <li className="navigation__item">
            <button className="navigation__button" type="button" onClick="onLogout">Log Out</button>
          </li>
        </ul>
      ) : (
        <ul className="navigation__list">
          <li className="navigation__item">
            <button className="navigation__button" type="button" onClick="onLoginClick">Log In</button>
          </li>
          <li className="navigation__item">
            <button className="navigation__button" type="button" onClick="onSignUpClick">Sign Up</button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
