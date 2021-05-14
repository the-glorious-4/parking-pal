/* SignupModal: Signup form for users of the app. */ 
import React, { useState } from "react";
import "./style.scss";
import Modal from "../Modal";
//import { formatPhoneNumber } from "../../utils/helpers";

// render signup page wrapped in a Modal.
const SignupModal = () => {
    const [formState, setFormState] = useState({ firstName: "", lastName: "", email: "", password: "", phone: "" });
    const [errFlags, setErrFlags] = useState({ emailError: false, passLengthError: false, phoneError: false });

    const handleChange = event => {
        // destructure event target
        const { name, value } = event.target;
        // update state
        setFormState({ ...formState, [name]: value });
    };

    // validate form and set error messages.
    const validateForm = fieldName => {
        switch(fieldName) {
            case "password":
                setErrFlags({
                    ...errFlags,
                    passLengthError: (formState.password.length < 6) ? true : false,
                });
                break;
            case "email":
                // setErrFlags({
                //     ...errFlags
                // });
                break;
            default:
                return;
        }
    };

    // on blur, validate fields
    const handleBlur = event => {
        validateForm(event.target.name);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        validateForm();
        // TODO: if no errors, await response from backend, get token, and login
    };

    return (
        <Modal>
            <div className="modal-bg">
                <h2>Create An Account</h2>
                <form className="signupForm" onSubmit={handleFormSubmit}>
                    <div className="field">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            placeholder="First Name"
                            name="firstName"
                            type="firstName"
                            id="firstName"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            placeholder="Last Name"
                            name="lastName"
                            type="lastName"
                            id="lastName"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email:</label>
                        <input
                            placeholder="name@domain.com"
                            name="email"
                            type="email"
                            id="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="pwd">Password:</label>
                        <input
                            placeholder="******"
                            name="password"
                            type="password"
                            id="pwd"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {!errFlags.passLengthError ? null :
                        <span className="signup-form-err">Your password must be at least 6 characters long.</span>}
                    </div>
                    <div className="field">
                        <label htmlFor="phone">Phone Number:</label>
                        <input
                            placeholder="555-555-5555"
                            name="phone"
                            type="tel"
                            id="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className="signup-submit">
                        <div>
                        <button type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default SignupModal;
