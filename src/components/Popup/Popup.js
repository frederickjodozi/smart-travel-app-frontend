import { React, useEffect } from 'react';
import './Popup.css';

function Popup({ isOpen, onClose, children }) {
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
      {children}
    </div>
  );
}

export default Popup;
