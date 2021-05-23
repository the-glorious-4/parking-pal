import React, { useEffect } from "react";
import { ADD_RESERVATION } from "../../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import Nav from "../../components/Nav";
import Auth from "../../utils/auth";

import "./style.scss";

import win from "./gifs/win.gif";
import elmo from "./gifs/elmo.gif";
import nailed from "./gifs/nailed.gif";
import zac from "./gifs/zac.gif";

const SuccessfulReservation = () => {
  Auth.loggedIn() === false && window.location.assign("/");

  const [addReservation, { error }] = useMutation(ADD_RESERVATION);

  error && console.log(error);

  //UNUSED VARIABLE CAUSES WARNING
  // const inventoryDetails = JSON.parse(
  //   window.localStorage.getItem("selectedInventory")
  // );
  // const { _id: inventoryId, startDate, price } = inventoryDetails;
  // const { _id: parkingPlace, apt, city, state } = inventoryDetails.parkingPlace;
  // const reservationDetails = {
  //   inventoryId,
  //   startDate,
  //   price,
  //   parkingPlace,
  //   address: `${apt} ${city} ${state}`,
  //   stripeSessionId: window.localStorage.getItem("stripeSessionId"),
  // };

  useEffect(() => {
    async function saveReservation() {
      //UNUSED VARIABLE CAUSES WARNING
      // const { data } = await addReservation({
      //   variables: { ...reservationDetails },
      // });
      localStorage.setItem("stripeSessionId", null);
      localStorage.setItem("selectedInventory", null);
      setTimeout(() => {
        window.location.assign("/dashboard");
      }, 6000);
    }

    saveReservation();
  }, [addReservation]);

  let imgPicker = Math.floor(Math.random() * 4 + 1);

  return (
    <>
      <Nav />
      <div className="successContainer">
        <div className="gifDiv">
          {
            {
              1: <img src={elmo} alt="elmo" />,
              2: <img src={nailed} alt="nailed" />,
              3: <img src={win} alt="win" />,
              4: <img src={zac} alt="zac" />,
            }[imgPicker]
          }
        </div>
        <div className="messageDiv">
          <h1>SUCCESS!</h1>
          <h2>Your payment was submitted</h2>
          <p>redirecting back to dashboard...</p>
        </div>
      </div>
    </>
  );
};

export default SuccessfulReservation;
