import React, { createContext, useContext } from "react";
import { useModalReducer } from "./reducers";

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useModalReducer({
        loginRendered: false,
        signupRendered: false,
        mapLocation: { lat: 37.774, lng: -122.419 }
    });
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
