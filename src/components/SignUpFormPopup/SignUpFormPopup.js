import { React, useState } from 'react';
import PopupForm from '../PopupForm/PopupForm';
import './SignUpFormPopup.css';

function SignUpFormPopup({ isOpen, onClose, onSubmit }) {
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
    <PopupForm isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} title="Sign Up" submitText="Create Profile">
      <input
        type="text"
        name="email"
        id="signupform__email"
        className="signupform__input"
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
        id="signupform__password"
        className="signupform__input"
        aria-label="password input"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Create a password"
        minLength="2"
        maxLength="30"
        required
      />
    </PopupForm>
  );
}

export default SignUpFormPopup;
