import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/react-hooks";
import flyingMoney from "./gifs/flying-money.gif";

import Nav from "../Nav";

import { QUERY_CHECKOUT } from "../../utils/queries";

const stripePromise = loadStripe(
  "pk_test_51InyxjLzbTTaQxk5EdjCWbj0CjXJoh7lPICpUdwvL8JhnLxqldfzi81FoyJVB8Hli3eUEgB2bTjcPy2iyglLsAQi006PhzzGwf"
);

const ProductDisplay = ({ price, handleClick }) => {
  setTimeout(() => {
    handleClick();
  }, 1500);
  return (
    <>
      <Nav />
      <div className="successContainer">
        <div className="gifDiv">
          <img src={flyingMoney} alt="flyingMoney" />{" "}
        </div>
        <div className="messageDiv">
          <h1>Redirecting your to the payment page...!</h1>
          <h2>Please wait</h2>
        </div>
      </div>
    </>
  );
};
const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export const StripeCheckout = () => {
  const [checkout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  // TODO: read from global state
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
