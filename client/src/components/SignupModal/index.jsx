/* SignupModal: Signup form for users of the app. */ 
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import "./style.scss";
import Modal from "../Modal";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import { validateEmail, formatPhoneNumber } from "../../utils/helpers";
import { RENDER_LOGIN_MODAL, REMOVE_MODAL, SET_CURRENT_USER } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

// render signup page wrapped in a Modal.
const SignupModal = () => {
    const [formState, setFormState] = useState({ firstName: "", lastName: "", email: "", password: "", phone: "" });
    const [errFlags, setErrFlags] = useState({ emailError: false, passLengthError: false, phoneError: false });
    const [addUser, { error }] = useMutation(ADD_USER);
    const [state, dispatch] = useStoreContext();

    const renderLoginModal = (event) => {
        event.preventDefault();
        dispatch({ type: REMOVE_MODAL });
        dispatch({ type: RENDER_LOGIN_MODAL });
    };

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
                    passLengthError: (formState.password.length < 6) ? true : false
                });
                break;
            case "email":
                setErrFlags({
                    ...errFlags,
                    emailError: !validateEmail(formState.email)
                });
                break;
            case "phone":
                setErrFlags({
                    ...errFlags,
                    phoneError: (formState.phone.length !== 10) ? true : false
                });
                break;
            default:
                return;
        }
    };

    // on blur, validate fields
    const handleBlur = event => {
        validateForm(event.target.name);
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        validateForm();
        // if no errors, await response from backend, get token, and login
        if (!errFlags.emailError && !errFlags.passLengthError && !errFlags.phoneError) {
            try {
                const { data } = await addUser({
                    variables: {
                        ...formState,
                        phone: formatPhoneNumber(formState.phone)
                    }
                });
                
                Auth.login(data.addUser.token);
                // set user in global state
                dispatch({
                    type: SET_CURRENT_USER,
                    currentUser: data,
                });
            }
            catch (e) {
                console.error(e);
            }
        }
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
                        {errFlags.emailError &&
                        <span className="form-err">Please enter a valid email address.</span>}
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
                        {errFlags.passLengthError &&
                        <span className="form-err">Your password must be at least 6 characters long.</span>}
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
                        {errFlags.phoneError &&
                        <span className="form-err">Please enter a valid phone number.</span>}
                    </div>
                    <div className="signup-submit">
                        <div>
                        <button type="submit">Submit</button>
                        </div>
                        <div>
                            <button className='insteadBtn' onClick={renderLoginModal}> Log-In Instead</button>
                        </div>
                    </div>
                </form>
                {error && <span className="form-err">Something went wrong!</span>}
            </div>
        </Modal>
    );
};

export default SignupModal;
