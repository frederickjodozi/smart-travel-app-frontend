import { useEffect, useState } from 'react';
import PopupForm from '../PopupForm/PopupForm';
import './LoginFormPopup.css';

function LoginFormPopup({ isOpen, onClose, onFormSwitch, onSubmit, logInError }) {
  // STATE VARIABLES //
  const [inputValues, setInputValues] = useState({
    email: '',
    password: ''
  });

  const [validationErrorMessages, setValidationErrorMessages] = useState({
    email: '',
    password: ''
  });

  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  // HANDLE INPUT CHANGE, VALIDATION AND SUBMIT //
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  async function handleValidation() {
    const errors = {
      email: '',
      password: ''
    };

    const validator = {
      email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      password: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/
    };

    if (!inputValues.email) {
      errors.email = 'Please enter your email address';
    } else if (!validator.email.test(inputValues.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!inputValues.password) {
      errors.password = 'Please enter your password';
    } else if (inputValues.password.length < 8) {
      errors.password = 'Registered passwords contain at least 8 alphanumeric characters';
    } else if (!validator.password.test(inputValues.password)) {
      errors.password =
        'Registered passwords contain upper and lowercase letters and a at least one digit';
    } else if (inputValues.password.length > 30) {
      errors.password = 'Registered passwords contain no more than 30 characters';
    }

    setValidationErrorMessages(errors);

    if (Object.values(errors).every((error) => error === '')) {
      setDisableSubmitButton(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValues);
    setInputValues({
      email: '',
      password: ''
    });

    setValidationErrorMessages({
      email: '',
      password: ''
    });

    setServerErrorMessage('');
    setDisableSubmitButton(true);
  };

  // RESET INPUT VALUES ON FORM CLOSE //
  useEffect(() => {
    setInputValues({
      email: '',
      password: ''
    });

    setValidationErrorMessages({
      email: '',
      password: ''
    });

    setServerErrorMessage('');
    setDisableSubmitButton(true);
  }, [onClose]);

  // RUN VALIDATION WHEN INPUT VALUES CHANGES //
  useEffect(() => {
    if (
      inputValues.email.length > 0 ||
      inputValues.password.length > 0
    ) {
      handleValidation();
    }
  }, [inputValues]);

  // STORE SERVER ERROR MESSAGES IN STATE VARIABLE //
  useEffect(() => {
    setServerErrorMessage(logInError);
  }, [logInError]);

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
        className={`loginform__input ${
          validationErrorMessages.email ? 'loginform__input-error' : ''
        }`}
        aria-label="email input"
        value={inputValues.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        autoComplete="off"
      />
      {validationErrorMessages.email && (
        <span className="loginform__error">{validationErrorMessages.email}</span>
      )}
      <input
        type="text"
        name="password"
        id="password"
        className={`loginform__input ${
          validationErrorMessages.password ? 'loginform__input-error' : ''
        }`}
        aria-label="password input"
        value={inputValues.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        autoComplete="off"
      />
      {validationErrorMessages.password && (
        <span className="loginform__error">{validationErrorMessages.password}</span>
      )}
      {serverErrorMessage && <span className="loginform__error">{serverErrorMessage}</span>}
    </PopupForm>
  );
}

export default LoginFormPopup;
