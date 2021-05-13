/* LoginModal/index.js: Login form for users of the app. */ 
import React, { useState } from "react";
import "./style.scss";
import Modal from "../Modal";

// render login page wrapped in a Modal.
const LoginModal = () => {
    const [formState, setFormState] = useState({ email: "", password: "" });

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
            <h2>Log In</h2>
            <form className="loginForm" onSubmit={handleFormSubmit}>
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

export default LoginModal;
