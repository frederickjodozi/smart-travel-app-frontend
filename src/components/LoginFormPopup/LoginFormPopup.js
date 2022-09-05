import { React, useState } from 'react';
import PopupForm from '../PopupForm/PopupForm';
import './LoginFormPopup.css';

function LoginFormPopup({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <PopupForm isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} title="Log In" submitText="Log in">
      <input
        type="text"
        name="loginform__email"
        id="email"
        className="loginform__input"
        aria-label="email input"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
        minLength="2"
        maxLength="30"
        required
      />
      <input
        type="text"
        name="password"
        id="loginform__password"
        className="loginform__input"
        aria-label="password input"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter your password"
        minLength="2"
        maxLength="30"
        required
      />
    </PopupForm>
  );
}

export default LoginFormPopup;
