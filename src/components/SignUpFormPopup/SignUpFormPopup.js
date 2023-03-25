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

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [showValidationErrors, setShowValidationErrors] = useState({
    name: false,
    email: false,
    password: false
  });

  const [serverError, setServerError] = useState('');
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  // HANDLE INPUT CHANGE, HANDLE FOCUSED INPUT AND HANDLE BLURRED INPUT //
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const handleInputFocus = (e) => {
    const { name } = e.target;

    const unfocusedInputs = Object.fromEntries(
      Object.entries(inputValues).filter(([key]) => key !== name)
    );
    const unfocusedValidationErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([key]) => key !== name)
    );

    /* SHOW VALIDATION ERROR FOR LAST FIELD TO BE FILLED:
    HELP USER UNDERSTAND WHY THE VALIDATION BUTTON IS STILL DISABLED */
    if (
      Object.values(unfocusedInputs).every((unfocusedInput) => unfocusedInput.length > 0) &&
      Object.values(unfocusedValidationErrors).every(
        (unfocusedValidationError) => unfocusedValidationError.length < 1
      )
    ) {
      setShowValidationErrors({
        ...showValidationErrors,
        [name]: true
      });
    }
  };

  const handleInputBlur = (e) => {
    const { name } = e.target;

    if (inputValues[name].length === 0) {
      return;
    }
    setShowValidationErrors({
      ...showValidationErrors,
      [name]: true
    });
  };

  // HANDLE VALIDATION AND RUN VALIDATION ON INPUT CHANGE //
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

    setValidationErrors(errors);

    if (Object.values(errors).every((error) => error === '')) {
      setDisableSubmitButton(false);
    } else {
      setDisableSubmitButton(true);
    }
  };

  useEffect(() => {
    if (Object.values(inputValues).some((inputValue) => inputValue.length > 0)) {
      handleValidation();
    }
  }, [inputValues]);

  // HANDLE SUBMIT AND RESET INPUT VALUES ON FORM CLOSE //
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValues);
    setInputValues({
      name: '',
      email: '',
      password: ''
    });

    setValidationErrors({
      name: '',
      email: '',
      password: ''
    });

    setShowValidationErrors({
      name: false,
      email: false,
      password: false
    });

    setServerError('');
    setDisableSubmitButton(true);
  };

  useEffect(() => {
    setServerError(signUpError);
  }, [signUpError]);

  useEffect(() => {
    setInputValues({
      name: '',
      email: '',
      password: ''
    });

    setValidationErrors({
      name: '',
      email: '',
      password: ''
    });

    setShowValidationErrors({
      name: false,
      email: false,
      password: false
    });

    setServerError('');
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
        className="signupform__input"
        aria-label="name input"
        value={inputValues.name}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Enter your username"
        autoComplete="off"
      />
      <span className="signupform__error">
        {showValidationErrors.name && inputValues.name.length > 0 ? validationErrors.name : ''}
      </span>
      <input
        type="text"
        name="email"
        id="signupform__email"
        className="signupform__input"
        aria-label="email input"
        value={inputValues.email}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Enter your email"
        autoComplete="off"
      />
      <span className="signupform__error">
        {showValidationErrors.email && inputValues.email.length > 0 ? validationErrors.email : ''}
      </span>
      <input
        type="text"
        name="password"
        id="signupform__password"
        className="signupform__input"
        aria-label="password input"
        value={inputValues.password}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Create a password"
        autoComplete="off"
      />
      <span className="signupform__error">
        {showValidationErrors.password && inputValues.password.length > 0 ? validationErrors.password : ''}
      </span>
      {serverError && <span className="signupform__error">{serverError}</span>}
    </PopupForm>
  );
}

export default SignUpFormPopup;
