import React, { useState } from "react";
import "./style.scss";
import { useMutation } from "@apollo/react-hooks";
import Nav from '../../components/Nav';
import { ADD_INVENTORY } from "../../utils/mutations";

const MySpots = () => {
    return (<>
        <div className="my-parking-bg content-container">
            <Nav />
        </div>
    </>);
};

export default MySpots;
