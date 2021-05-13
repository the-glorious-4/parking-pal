/* SignupModal: Signup form for users of the app. */ 
import React, { useState } from "react";
import "./style.scss";
import Modal from "../Modal";

// render signup page wrapped in a Modal.
const SignupModal = () => {
    const [formState, setFormState] = useState({ firstname: "", lastname: "", email: "", password: "" });

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    // TODO: validate function to check for any constraints

    const handleFormSubmit = event => {
        event.preventDefault();
        // TODO: validate, await response from backend, get token, and login
    };

    return (
        <Modal>
            <h2>Sign Up</h2>
            <form className="signupForm" onSubmit={handleFormSubmit}>
                <div className="field">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        placeholder="First"
                        name="firstName"
                        type="firstName"
                        id="firstName"
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        placeholder="Last"
                        name="lastName"
                        type="lastName"
                        id="lastName"
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor="email">Email:</label>
                    <input
                        placeholder="youremail@test.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
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
                    />
                </div>
                <div className="submit">
                    <button type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default SignupModal;
