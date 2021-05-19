import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/react-hooks";

import { QUERY_CHECKOUT } from "../../utils/queries";

const dummyData = {
  inventoryId: "60a341fd64942fbf1e92b087",
  parkingPlace: "60a33a5f05923f7599b9d0c4",
  startDate: "2021-05-15T20:26:39Z",
  stripeTransaction: "1234567890",
};

const stripePromise = loadStripe(
  "pk_test_51InyxjLzbTTaQxk5EdjCWbj0CjXJoh7lPICpUdwvL8JhnLxqldfzi81FoyJVB8Hli3eUEgB2bTjcPy2iyglLsAQi006PhzzGwf"
);

const ProductDisplay = ({ price, handleClick }) => (
  <section>
    <div className="product">
      <img
        src="../../images/private-garage.png"
        alt="Reserve your parking now"
      />
      <div className="description">
        <h3>Parking Place Details</h3>
        <h5>Price: {price}</h5>
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

export const StripeCheckout = () => {
  const [checkout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const price = 100;
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("cancel")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleReservation = async (event) => {
    await redirectToStripeCheckout(event);
  };

  const redirectToStripeCheckout = async (event) => {
    checkout({ variables: { price: price } });
  };

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleReservation} price={price} />
  );
};
