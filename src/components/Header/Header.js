import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import '../../blocks/wrapper/wrapper.css';
import logo from '../../images/logo.svg';

function Header({ isLoggedIn, onLogout, onSignUpClick, onLoginClick }) {
  return (
    <header className="header wrapper_type_small">
      <Link to="/smart-travel-app-frontend">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        onSignUpClick={onSignUpClick}
        onLoginClick={onLoginClick}
      />
    </header>
  );
}

export default Header;
