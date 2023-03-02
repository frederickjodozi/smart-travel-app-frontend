import { useState } from 'react';
import PopupForm from '../PopupForm/PopupForm';
import './SignUpFormPopup.css';

function SignUpFormPopup({ isOpen, onClose, onFormSwitch, onSubmit }) {
  const [inputValues, setInputValues] = useState({
    name: '',
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

    if (!inputValues.name) {
      error.name = 'Please enter a username';
    } else if (inputValues.name.length < 2) {
      error.name = 'Please enter a username that has at least two characters';
    } else if (inputValues.name.length > 30) {
      error.name = "Your username can't contain more than 30 characters";
    }

    if (!inputValues.email) {
      error.email = 'Please enter an email address';
    } else if (!validator.email.test(inputValues.email)) {
      error.email = 'Please enter a valid email address';
    }

    if (!inputValues.password) {
      error.password = 'Please enter a password';
    } else if (inputValues.password.length < 8) {
      error.password = 'Your password must contain at least 8 alphanumeric characters';
    } else if (!validator.password.test(inputValues.password)) {
      error.password =
        'Please enter at least one uppercase letter, one lowercase letter and one digit';
    } else if (inputValues.password.length > 30) {
      error.password = 'Your password must contain no more than 30 characters';
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
      name: '',
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
      title="Sign Up"
      submitText="Create Profile"
      disableSubmitButton={disableSubmitButton}
      linkText="Log In"
    >
      <input
        type="text"
        name="name"
        id="signupform__name"
        className={`signupform__input ${errorMessages.name ? 'signupform__input-error' : ''}`}
        aria-label="name input"
        value={inputValues.name}
        onChange={handleInputChange}
        placeholder="Enter your username"
        autoComplete="off"
      />
      {errorMessages.name && <span className="signupform__error">{errorMessages.name}</span>}
      <input
        type="text"
        name="email"
        id="signupform__email"
        className={`signupform__input ${errorMessages.email ? 'signupform__input-error' : ''}`}
        aria-label="email input"
        value={inputValues.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        autoComplete="off"
      />
      {errorMessages.email && <span className="signupform__error">{errorMessages.email}</span>}
      <input
        type="text"
        name="password"
        id="signupform__password"
        className={`signupform__input ${errorMessages.password ? 'signupform__input-error' : ''}`}
        aria-label="password input"
        value={inputValues.password}
        onChange={handleInputChange}
        placeholder="Create a password"
        autoComplete="off"
      />
      {errorMessages.password && (
        <span className="signupform__error">{errorMessages.password}</span>
      )}
    </PopupForm>
  );
}

export default SignUpFormPopup;
