import { React } from 'react';
import './Navigation.css';

function Navigation({isLoggedIn, onLogout, onSignUpClick, onLoginClick}) {
  return (
    <div className="navigation">
      {isLoggedIn ? (
        <>
          <a className="navigation__link" href="#home">Home</a>
          <a className="navigation__link" href="#savedarticles">Saved Articles</a>
          <button className="navigation__button" type="button" onClick="onLogout">Log Out</button>
        </>
      ) : (
        <>
          <button className="navigation__button" type="button" onClick="onLoginClick">Log In</button>
          <button className="navigation__button" type="button" onClick="onSignUpClick">Sign Up</button>
        </>
      )}
    </div>
  );
}

export default Navigation;
