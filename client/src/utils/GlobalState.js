import React, { createContext, useContext } from "react";
import { useModalReducer } from "./reducers";
import { todaysDate } from './helpers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useModalReducer({
        loginRendered: false,
        signupRendered: false,
        mapLocation: { lat: 37.774, lng: -122.419 },
        mapDate: todaysDate(),
        mapCity: 'San Francisco',
        selectedInventory: null,
        currentUser: null,
        initialRedirect: false,
        loadingGif: false,
    });
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
