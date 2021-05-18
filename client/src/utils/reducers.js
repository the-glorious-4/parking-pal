import { useReducer } from "react";
import {
    RENDER_LOGIN_MODAL,
    RENDER_SIGNUP_MODAL,
    REMOVE_MODAL,
    UPDATE_MAP_LOCATION,
    UPDATE_MAP_DATE
} from "./actions";

/*
state: {
    loginRendered: boolean, used to conditionally render <LoginModal> component
    signupRendered: boolean, used to conditionally render <SignupModal> component
}
*/

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_MAP_LOCATION:
            return {
                ...state,
                mapLocation: action.location
            }
        case UPDATE_MAP_DATE:
            return {
                ...state,
                mapDate: action.mapDate
            }
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
