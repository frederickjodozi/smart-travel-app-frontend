import { React, useState } from 'react';
import PopupForm from '../PopupForm/PopupForm';
import './LoginFormPopup.css';

function LoginFormPopup({ isOpen, onClose, onSubmit }) {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: ''
  });

  const [errorMessages, setErrorMessages] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  async function handleValidation() {
    const error = {};

    if (!inputValues.email) {
      error.email = 'Please enter an email address';
    } else if (inputValues.email.length < 3) {
      error.email = 'Please enter a valid email address';
    }

    if (!inputValues.password) {
      error.password = 'Please enter a password';
    } else if (inputValues.password.length < 6) {
      error.password = 'Your password must contain at least 6 characters';
    } else if (inputValues.password.length > 30) {
      error.password = 'Your password must contain no more than 30 characters';
    }

    return error;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleValidation().then((error) => {
      if (Object.keys(error).length === 0) {
        onSubmit(inputValues);
        setInputValues({
          email: '',
          password: ''
        });
        setErrorMessages({});
      } else {
        setErrorMessages(error);
      }
    });
  };

  return (
    <PopupForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Log In" submitText="Log in">
      <input
        type="text"
        name="email"
        id="email"
        className={`loginform__input ${errorMessages.email ? 'loginform__input-error' : ''}`}
        aria-label="email input"
        value={inputValues.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
      />
      {errorMessages.email && <span className="loginform__error">{errorMessages.email}</span>}
      <input
        type="text"
        name="password"
        id="password"
        className={`loginform__input ${errorMessages.password ? 'loginform__input-error' : ''}`}
        aria-label="password input"
        value={inputValues.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
      />
      {errorMessages.password && <span className="loginform__error">{errorMessages.password}</span>}
    </PopupForm>
  );
}

export default LoginFormPopup;
