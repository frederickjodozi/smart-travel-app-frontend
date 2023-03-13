import { useEffect, useState } from 'react';
import PopupForm from '../PopupForm/PopupForm';
import './SignUpFormPopup.css';

function SignUpFormPopup({ isOpen, onClose, onFormSwitch, onSubmit, signUpError }) {
  // STATE VARIABLES //
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [validationErrorMessages, setValidationErrorMessages] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  const handleValidation = () => {
    const errors = {
      name: '',
      email: '',
      password: ''
    };

    const validator = {
      email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      password: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/
    };

    if (!inputValues.name) {
      errors.name = 'Please enter a username';
    } else if (inputValues.name.length < 2) {
      errors.name = 'Please enter a username that has at least two characters';
    } else if (inputValues.name.length > 30) {
      errors.name = "Your username can't contain more than 30 characters";
    }

    if (!inputValues.email) {
      errors.email = 'Please enter an email address';
    } else if (!validator.email.test(inputValues.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!inputValues.password) {
      errors.password = 'Please enter a password';
    } else if (inputValues.password.length < 8) {
      errors.password = 'Your password must contain at least 8 alphanumeric characters';
    } else if (!validator.password.test(inputValues.password)) {
      errors.password =
        'Please enter at least one uppercase letter, one lowercase letter and one digit';
    } else if (inputValues.password.length > 30) {
      errors.password = 'Your password must contain no more than 30 characters';
    }

    setValidationErrorMessages(errors);

    if (Object.values(errors).every((error) => error === '')) {
      setDisableSubmitButton(false);
    } else {
      setDisableSubmitButton(true);
    }
  };

  // HANDLE INPUT CHANGE AND RUN VALIDATION ON INPUT CHANGE //
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  useEffect(() => {
    if (Object.values(inputValues).some((inputValue) => inputValue.length > 0)) {
      handleValidation();
    }
  }, [inputValues]);

  // HANDLE SUBMIT AND SHOW SERVER ERROR MESSAGE //
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValues);
    setInputValues({
      name: '',
      email: '',
      password: ''
    });

    setValidationErrorMessages({
      name: '',
      email: '',
      password: ''
    });

    setServerErrorMessage('');
    setDisableSubmitButton(true);
  };

  useEffect(() => {
    setServerErrorMessage(signUpError);
  }, [signUpError]);

  // RESET INPUT VALUES ON FORM CLOSE //
  useEffect(() => {
    setInputValues({
      name: '',
      email: '',
      password: ''
    });

    setValidationErrorMessages({
      name: '',
      email: '',
      password: ''
    });

    setServerErrorMessage('');
    setDisableSubmitButton(true);
  }, [onClose]);

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
        className={`signupform__input ${
          validationErrorMessages.name ? 'signupform__input-error' : ''
        }`}
        aria-label="name input"
        value={inputValues.name}
        onChange={handleInputChange}
        placeholder="Enter your username"
        autoComplete="off"
      />
      {validationErrorMessages.name && (
        <span className="signupform__error">{validationErrorMessages.name}</span>
      )}
      <input
        type="text"
        name="email"
        id="signupform__email"
        className={`signupform__input ${
          validationErrorMessages.email ? 'signupform__input-error' : ''
        }`}
        aria-label="email input"
        value={inputValues.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        autoComplete="off"
      />
      {validationErrorMessages.email && (
        <span className="signupform__error">{validationErrorMessages.email}</span>
      )}
      <input
        type="text"
        name="password"
        id="signupform__password"
        className={`signupform__input ${
          validationErrorMessages.password ? 'signupform__input-error' : ''
        }`}
        aria-label="password input"
        value={inputValues.password}
        onChange={handleInputChange}
        placeholder="Create a password"
        autoComplete="off"
      />
      {validationErrorMessages.password && (
        <span className="signupform__error">{validationErrorMessages.password}</span>
      )}
      {serverErrorMessage && <span className="signupform__error">{serverErrorMessage}</span>}
    </PopupForm>
  );
}

export default SignUpFormPopup;
