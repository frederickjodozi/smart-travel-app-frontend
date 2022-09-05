import { React, useEffect } from 'react';
import './PopupForm.css';

function PopupForm({
  isOpen, onClose, onSubmit, title, submitText, children
}) {
  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    // eslint-disable-next-line consistent-return
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`popup ${isOpen ? 'popup_active' : ''}`} onClick={handleOverlay}>
      <div className="popup__box">
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit-button">{submitText}</button>
        </form>
        <button className="popup__close-button" type="button" onClick={onClose}/>
      </div>
    </div>
  );
}

export default PopupForm;
