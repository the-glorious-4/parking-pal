import React from "react";
import "./style.scss";
import { useQuery } from "@apollo/react-hooks";
import Auth from "../../utils/auth";
import { QUERY_USER } from "../../utils/queries";
import Nav from '../../components/Nav';

const History = () => {
    const { loading, data } = useQuery(QUERY_USER);
    let user;
    
    user = data?.user || {};

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!Auth.loggedIn()) {
        return <h1>Returning to Homepage...</h1>;
    }

    return (<>
        <Nav />
        <div className="history">
            <h1>History for {user.firstName} {user.lastName}</h1>
        </div>

    </>);
};

export default History;
