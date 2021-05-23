import { useReducer } from "react";
import {
    RENDER_LOGIN_MODAL,
    RENDER_SIGNUP_MODAL,
    REMOVE_MODAL,
    UPDATE_MAP_LOCATION,
    UPDATE_MAP_DATE,
    UPDATE_QUERY_CITY,
    UPDATE_SELECTED_INVENTORY,
    SET_CURRENT_USER,
    REDIRECT_ON_LOGIN,
    SET_LOADING
} from "./actions";

/*
state: {
    loginRendered: boolean, used to conditionally render <LoginModal> component
    signupRendered: boolean, used to conditionally render <SignupModal> component
}
*/

export const reducer = (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loadingGif: !state.loadingGif
            }
        case REDIRECT_ON_LOGIN:
            return {
                ...state,
                initialRedirect: !state.initialRedirect
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser
            }
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
        case UPDATE_QUERY_CITY:
            return {
                ...state,
                mapCity: action.mapCity
            }
        case UPDATE_SELECTED_INVENTORY:
            return {
                ...state,
                selectedInventory: action.selectedInventory
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
