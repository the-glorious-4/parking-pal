import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/react-hooks";
import { useStoreContext } from "../../utils/GlobalState";
import Auth from "../../utils/auth";
import flyingMoney from "./gifs/flying-money.gif";
import Nav from "../../components/Nav";
import { QUERY_CHECKOUT } from "../../utils/queries";

const stripePromise = loadStripe(
  "pk_test_51InyxjLzbTTaQxk5EdjCWbj0CjXJoh7lPICpUdwvL8JhnLxqldfzi81FoyJVB8Hli3eUEgB2bTjcPy2iyglLsAQi006PhzzGwf"
);

const Redirect = ({ redirectToStripeCheckout }) => {
  
  setTimeout(() => {
    redirectToStripeCheckout();
  }, 1500);
  return (
    <>
      <Nav />
      <div className="successContainer">
        <div className="gifDiv">
          <img src={flyingMoney} alt="flyingMoney" />{" "}
        </div>
        <div className="messageDiv">
          <h1>Redirecting you to the payment page!</h1>
          <h2>Please wait...</h2>
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

const StripeCheckout = () => {
<<<<<<< HEAD
  Auth.loggedIn() === false && window.location.assign('/');
  const [state, _] = useStoreContext();
  const price = state.selectedInventory.price;

=======
>>>>>>> 2cf13eaf394dde94b12881fde6d976ed1855a712
  const [checkout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [message, setMessage] = useState("");
  const [state, _] = useStoreContext();
  const price = state.selectedInventory.price;

  useEffect(() => {
    if (data) {
      localStorage.setItem(
        "selectedInventory",
        JSON.stringify(state.selectedInventory)
      );
      localStorage.setItem(
        "stripeSessionId",
        JSON.stringify(data.checkout.session)
      );
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

  const redirectToStripeCheckout = async (event) => {
    checkout({ variables: { price: price } });
  };

  return message ? (
    <Message message={message} />
  ) : (
    <Redirect redirectToStripeCheckout={redirectToStripeCheckout} />
  );
};

const Checkout = () => {
  return (
    <div>
      <StripeCheckout />
    </div>
  );
};

export default Checkout;
