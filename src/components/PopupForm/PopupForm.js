import Popup from '../Popup/Popup';
import './PopupForm.css';

function PopupForm({ isOpen, onClose, onSubmit, title, submitText, children }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup__box">
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit-button" aria-label="submit">
            {submitText}
          </button>
        </form>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
          aria-label="close popup"
        />
      </div>
    </Popup>
  );
}

export default PopupForm;
