/* LoginModal/index.js: Login form for users of the app. */ 
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
// import "./style.scss";
import Modal from "../Modal";
import Auth from "../../utils/auth";
import { LOGIN_USER } from "../../utils/mutations";
import { validateEmail } from "../../utils/helpers";
import { RENDER_SIGNUP_MODAL, REMOVE_MODAL, SET_CURRENT_USER  } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

// render login page wrapped in a Modal.
const LoginModal = () => {
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [errFlags, setErrFlags] = useState({ emailError: false });
    const [login, { error }] = useMutation(LOGIN_USER);

    const [state, dispatch] = useStoreContext();

    const renderSignupModal = (event) => {
        event.preventDefault();
        dispatch({ type: REMOVE_MODAL });
        dispatch({ type: RENDER_SIGNUP_MODAL });
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
            case "email":
                setErrFlags({
                    ...errFlags,
                    emailError: !validateEmail(formState.email)
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
        if (!errFlags.emailError) {
            try {
                const { data } = await login({
                    variables: { ...formState }
                });
    
                Auth.login(data.login.token);
                dispatch({
                    type: SET_CURRENT_USER,
                    currentUser: data.user,
                });

                alert('data!!! ' + JSON.stringify(data))
                // alert('state.currentUser!!! ' + JSON.stringify(state.currentUser))
                // alert('state!!! ' + JSON.stringify(state))

                
            }
            catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <Modal>
            <div className="modal-bg">
                <h2>Log In</h2>
                <form className="loginForm signupForm" onSubmit={handleFormSubmit}>
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
                        <span className="form-err">This is not a valid email address.</span>}
                    </div>
                    <div className="field">
                        <label htmlFor="pass">Password:</label>
                        <input
                            placeholder="******"
                            name="password"
                            type="password"
                            id="pass"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="signup-submit">
                        <div>
                        <button type="submit">Submit</button>
                        </div>
                        <div>
                        <button className='insteadBtn' onClick={renderSignupModal}>Sign-Up Instead</button>
                        </div>
                    </div>
                </form>
                {error && <span className="form-err">Something went wrong with your log-in!</span>}
            </div>
        </Modal>
    );
};

export default LoginModal;
