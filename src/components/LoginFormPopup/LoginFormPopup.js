import { useState } from 'react';
import PopupForm from '../PopupForm/PopupForm';
import './LoginFormPopup.css';

function LoginFormPopup({ isOpen, onClose, onFormSwitch, onSubmit }) {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: ''
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  async function handleValidation() {
    const error = {};
    const validator = {
      email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      password: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/
    };

    if (!inputValues.email) {
      error.email = 'Please enter your email address';
    } else if (!validator.email.test(inputValues.email)) {
      error.email = 'Please enter a valid email address';
    }

    if (!inputValues.password) {
      error.password = 'Please enter your password';
    } else if (inputValues.password.length < 8) {
      error.password = 'Registered passwords contain at least 8 alphanumeric characters';
    } else if (!validator.password.test(inputValues.password)) {
      error.password =
        'Registered passwords contain upper and lowercase letters and a at least one digit';
    } else if (inputValues.password.length > 30) {
      error.password = 'Registered passwords contain no more than 30 characters';
    }

    return error;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
    handleValidation().then((error) => {
      if (Object.keys(error).length === 0) {
        setErrorMessages({});
        setDisableSubmitButton(false);
      } else {
        setErrorMessages(error);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValues);
    setInputValues({
      email: '',
      password: ''
    });
    setErrorMessages({});
    setDisableSubmitButton(true);
  };

  return (
    <PopupForm
      isOpen={isOpen}
      onClose={onClose}
      onFormSwitch={onFormSwitch}
      onSubmit={handleSubmit}
      title="Log In"
      submitText="Log in"
      disableSubmitButton={disableSubmitButton}
      linkText="Sign In"
    >
      <input
        type="text"
        name="email"
        id="email"
        className={`loginform__input ${errorMessages.email ? 'loginform__input-error' : ''}`}
        aria-label="email input"
        value={inputValues.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        autoComplete="off"
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
        autoComplete="off"
      />
      {errorMessages.password && <span className="loginform__error">{errorMessages.password}</span>}
    </PopupForm>
  );
}

export default LoginFormPopup;
