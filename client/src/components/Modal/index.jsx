/* Modal/index.js: general-purpose modal component. Wrap content in this! */ 
import React from 'react';
import './style.scss';

// parent component renders modal visible/hidden based on state.
const Modal = ({ children }) => {
  // function to dismiss modal
  const dismissModal = event => {
    console.log("clicked");
  };

  return (
    <>
      <div className="modal">
        <p>test</p>"test"
        {children}
      </div>
      <div className="modal-backdrop" onClick={dismissModal}></div>
    </>
  );
};

export default Modal;
