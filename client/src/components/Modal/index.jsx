/* Modal/index.js: general-purpose modal component. Wrap content in this! */ 
import React from "react";
import "./style.scss";
import { REMOVE_MODAL } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

// parent component renders modal visible/hidden based on state.
const Modal = ({ children }) => {
    const [, dispatch] = useStoreContext();

    // remove modal from DOM via state
    const dismissModal = event => {
        dispatch({ type: REMOVE_MODAL });
    };

    return (
        <>
            <div className="modal">
                <div className="modal-box">
                    <div className="modal-content">
                        {/* Close Button */}
                        <div className="modal-close">
                            <span className="modal-close-btn" onClick={dismissModal}>X</span>
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
