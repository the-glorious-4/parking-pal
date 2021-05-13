/* Modal/index.js: general-purpose modal component. Wrap content in this! */ 
import React from 'react';
import './style.scss';

// parent component renders modal visible/hidden based on state.
const Modal = ({ children }) => {
  // TODO: function to dismiss modal, either altering global state or via css
  const dismissModal = event => {
    console.log("clicked");
  };

  return (
    <>
      <div className="modal">
        <div className="modal-box">
          <div className="modal-content">
            {/* Close Button */}
            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <span className="closeBtn" onClick={dismissModal}>X</span>
            </div>
            {/* Content */}
            {children}
          </div>
        </div>
        <div className="modal-backdrop" onClick={dismissModal}></div>
      </div>
    </>
  );
};

export default Modal;
