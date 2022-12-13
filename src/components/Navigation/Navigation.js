import { Link } from 'react-router-dom';
import './Navigation.css';
import homeIcon from '../../images/homeIcon.svg';
import articlesIcon from '../../images/articlesIcon.svg';

function Navigation({ isLoggedIn, onLogout, onSignUpClick, onLoginClick }) {
  return (
    <nav className="navigation">
      {isLoggedIn ? (
        <ul className="navigation__list">
          <li className="navigation__item">
            <img src={homeIcon} className="navigation__icon" alt="home icon" />
            <Link to="/" className="navigation__link" aria-label="home">
              Home
            </Link>
          </li>
          <li className="navigation__item">
            <img src={articlesIcon} className="navigation__icon" alt="saved articles icon" />
            <Link to="/saved-articles" className="navigation__link" aria-label="saved articles">
              Saved Articles
            </Link>
          </li>
          <li className="navigation__item">
            <button
              className="navigation__button"
              type="button"
              onClick={onLogout}
              aria-label="Log Out"
            >
              Log Out
            </button>
          </li>
        </ul>
      ) : (
        <ul className="navigation__list">
          <li className="navigation__item">
            <button
              className="navigation__button"
              type="button"
              onClick={onLoginClick}
              aria-label="Log In"
            >
              Log In
            </button>
          </li>
          <li className="navigation__item">
            <button
              className="navigation__button"
              type="button"
              onClick={onSignUpClick}
              aria-label="Sign In"
            >
              Sign Up
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
