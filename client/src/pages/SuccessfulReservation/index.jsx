import React, { useEffect } from "react";
import { ADD_RESERVATION } from "../../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import Nav from '../../components/Nav';
import Auth from "../../utils/auth";

import './style.scss';

import win from './gifs/win.gif';
import elmo from './gifs/elmo.gif';
import nailed from './gifs/nailed.gif';
import zac from './gifs/zac.gif';

const SuccessfulReservation = () => {
    Auth.loggedIn() === false && window.location.assign('/');

  const [addReservation, { error }] = useMutation(ADD_RESERVATION);

  // TODO: Replace with the actual data
  const dummyData = {
    inventoryId: "60a341fd64942fbf1e92b087",
    parkingPlace: "60a33a5f05923f7599b9d0c4",
    startDate: "2021-05-15T20:26:39Z",
    name: "Yulduz",
    lastName: "Test",
    email: "yulduz83@gmail.com",
    address: "123 Pine Street, NY, 12345",
    stripeSessionId: "ipi_1GtFmN2eZvKYlo2CBramsMXt",
    price: 2000,
  };

  useEffect(() => {
    async function saveReservation() {
      const { data } = await addReservation({
        variables: { ...dummyData },
      });
      setTimeout(() => {
        window.location.assign("/");
      }, 6000);
    }

    saveReservation();
  }, [addReservation]);

  let imgPicker = Math.floor(Math.random() * 4 + 1);

  return (<>
    <Nav />
    <div className='successContainer'>
      <div className='gifDiv'>
        {{
          '1': <img src={elmo} alt="elmo" />,
          '2': <img src={nailed} alt="nailed" />,
          '3': <img src={win} alt="win" />,
          '4': <img src={zac} alt="zac" />
        }[imgPicker]}
      </div>
      <div className='messageDiv'>
        <h1>SUCCESS!</h1>
        <h2>Your payment was submitted</h2>
        <p>redirecting back to dashboard...</p>
      </div>
    </div>
  </>
  );
};

export default SuccessfulReservation;
