import { React } from 'react';
import Popup from '../Popup/Popup';
import './LoadingPopup.css';

function LoadingPopup({ isOpen }) {
  return (
    <Popup isOpen={isOpen}>
      <div className="loadingpopup">
        <i className="loadingpopup__circle" />
        <span className="loadingpopup__message">Loading your results...</span>
      </div>
    </Popup>
  );
}

export default LoadingPopup;
