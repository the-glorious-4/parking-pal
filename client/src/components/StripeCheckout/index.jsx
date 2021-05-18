import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@apollo/react-hooks";

import { ADD_RESERVATION } from "../../utils/mutations";

const dummyData = {
  inventoryId: "60a341fd64942fbf1e92b087",
  parkingPlace: "60a33a5f05923f7599b9d0c4",
  startDate: "2021-05-15T20:26:39Z",
  stripeTransaction: "1234567890",
};

// move to .env
const stripePromise = loadStripe(
  "pk_test_51InyxjLzbTTaQxk5EdjCWbj0CjXJoh7lPICpUdwvL8JhnLxqldfzi81FoyJVB8Hli3eUEgB2bTjcPy2iyglLsAQi006PhzzGwf"
);

const ProductDisplay = ({ handleClick }) => (
  <section>
    <div className="product">
      <img
        src="../../images/private-garage.png"
        alt="Reserve your parking now"
      />
      <div className="description">
        <h3>Parking Place Details</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <button
      type="button"
      id="checkout-button"
      role="link"
      onClick={handleClick}
    >
      Checkout
    </button>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function StripeCheckout() {
  const [message, setMessage] = useState("");

  const [addReservation, { error }] = useMutation(ADD_RESERVATION);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleReservation = async (event) => {
    const stripe = await handleClick(event);

    try {
      const { data } = await addReservation({
        variables: dummyData, // TODO: put actual data here
      });
      // send emails
      if (data) {
        console.log("YAY");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = async (event) => {
    const stripe = await stripePromise;

    const response = await fetch("/checkout", {
      method: "POST",
    });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    return result;
  };

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleReservation} />
  );
}
