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
            {/* <p>test filler content</p>
            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse magnam officiis saepe, 
              beatae nemo commodi perspiciatis architecto! Sapiente, porro? Aperiam natus sunt nesciunt 
              aliquam blanditiis esse consequuntur non error ipsum?</p> */}
            {children}
          </div>
        </div>
        <div className="modal-backdrop" onClick={dismissModal}></div>
      </div>
    </>
  );
};

export default Modal;
