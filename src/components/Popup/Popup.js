/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { React, useEffect } from 'react';
import './Popup.css';

function Popup({
  isOpen, location, onClose, children
}) {
  useEffect(() => {
    if (!isOpen && !location) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen || location ? 'popup_active' : ''}`}
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  );
}

export default Popup;
