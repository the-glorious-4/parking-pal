import { useReducer } from "react";
import {
    RENDER_LOGIN_MODAL,
    RENDER_SIGNUP_MODAL,
    REMOVE_MODAL
} from "./actions";

/*
state: {
    loginRendered: boolean, used to conditionally render <LoginModal> component
    signupRendered: boolean, used to conditionally render <SignupModal> component
}
*/

export const reducer = (state, action) => {
    switch (action.type) {
        case RENDER_LOGIN_MODAL:
            return {
                ...state,
                loginRendered: true
            };
        case RENDER_SIGNUP_MODAL:
            return {
                ...state,
                signupRendered: true
            };
        case REMOVE_MODAL:
            return {
                ...state,
                loginRendered: false,
                signupRendered: false
            };
        default:
            return state;
    }
};

export function useModalReducer(initialState) {
    return useReducer(reducer, initialState);
};
