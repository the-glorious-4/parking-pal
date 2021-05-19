import React, { useEffect } from "react";
import { ADD_RESERVATION } from "../../utils/mutations";
import { useMutation } from "@apollo/react-hooks";

const SuccessfulReservation = () => {
  const [addReservation, { error }] = useMutation(ADD_RESERVATION);
  useEffect(() => {
    async function saveReservation() {
      const { data } = await addReservation({
        variables: {
          inventoryId: "60a341fd64942fbf1e92b087",
          parkingPlace: "60a33a5f05923f7599b9d0c4",
          startDate: "2021-05-15T20:26:39Z",
          stripeTransaction: "1234567890",
        },
      });
      const reservationData = data.addReservation._id;

      // send email

      setTimeout(() => {
        window.location.assign("/");
      }, 3000);
    }

    saveReservation();
  }, [addReservation]);

  return (
    <div>
      <section>
        <p>Your payment has been successfully submitted</p>
      </section>
    </div>
  );
};

export default SuccessfulReservation;
