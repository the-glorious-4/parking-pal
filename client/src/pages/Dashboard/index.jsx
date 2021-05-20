import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import "./style.scss";
import Auth from "../../utils/auth";
import { formatDate } from "../../utils/helpers";
import { QUERY_USER, QUERY_ACTIVE_RESERVATIONS } from "../../utils/queries";
import Nav from "../../components/Nav";
// import { SET_CURRENT_USER } from "../../utils/actions";

const today = Date.now().toString();

const Dashboard = () => {
//   const [state, dispatch] = useStoreContext();
  const { loading, data } = useQuery(QUERY_USER);
  const { loading: rloading, data: rdata } = useQuery(
    QUERY_ACTIVE_RESERVATIONS,
    {
      variables: { startDate: today },
    }
  );
  let user, reservations;

  user = data?.user || {};
  reservations = rdata?.getConsumerReservations || {};

//   // set user in global state
//   dispatch({
//     type: SET_CURRENT_USER,
//     currentUser: user,
//   });


  if (loading || rloading) {
    return <h1>Loading...</h1>;
  }
  if (!Auth.loggedIn) {
    return <h1>Returning to Homepage...</h1>;
  }

  return (
    <div className="dashboard-bg content-container">
      <Nav />
      {user ? (
        <div className="dashboard">
          <h1>Welcome, {user.firstName}!</h1>
          <div className="active-lists">
            <div className="dash-list">
              <h2>Current and Upcoming Reservations</h2>
              {
                // if user has any active reservations, display them
                reservations ? (
                  <ul>
                    {reservations.map(
                      ({
                        startDate,
                        parkingPlace: { _id, street, apt, city, state, zip },
                      }) => (
                        <li key={_id}>
                          <span className="dateheader">
                            {formatDate(startDate)}
                          </span>
                          {`${street} ${apt} ${city}, ${state} ${zip}`}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <span className="dashboard-nolist">
                    You currently have no active reservations.
                  </span>
                )
              }
              <Link to="/findparking">
                <button>Reserve a Parking Space</button>
              </Link>
            </div>
            <div className="dash-list">
              <h2>Your Spaces</h2>
              {
                // if user is a provider, display parking spaces they own
                user.parkingPlace ? (
                  <ul>
                    {user.parkingPlace.map(
                      ({ _id, street, apt, city, state, zip }) => (
                        <li key={_id}>
                          {`${street} ${apt} ${city}, ${state} ${zip}`}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <span className="dashboard-nolist">
                    You are currently not a Parking Space Provider.
                  </span>
                )
              }
              <Link to="/addparking">
                <button>Add a new Parking Space</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="page-error">Something went wrong!</h1>
      )}
    </div>
  );
};

export default Dashboard;
