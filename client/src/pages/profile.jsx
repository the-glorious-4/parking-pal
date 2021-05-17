import React from 'react';

import {useQuery } from '@apollo/react-hooks';
import { QUERY_USER_PROFILE } from '../utils/queries'
import Auth from '../utils/auth';

const Profile = () => {
    debugger;
    const { loading, data } = useQuery(QUERY_USER_PROFILE);
    const user = data?.me || {};
    const loggedIn = Auth.loggedIn();

    return (<>
     {loggedIn && user ? (
         <>
            <h2>{ user.firstName} {user.lastName}'s Profile</h2>
            <p>Email : { user.email}</p>
            <p>Phone : { user.phone}</p>
            
            {user.parkingPlace ? ( 
                <>
                <h2>Parking Place </h2>
                <table>     
                <tr>
                    <th>Parking Locations</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Covered Parking</th>
                    <th>Capacity</th>
                </tr>
                {user.parkingPlace.map((parkingLot) => (
                    <>
                    <tr>
                        <td>{parkingLot.apt} - {parkingLot.street}</td>
                        <td>{parkingLot.city}</td>
                        <td>{parkingLot.state}</td>
                        <td>{parkingLot.zip}</td>
                        <td>{parkingLot.isCoveredParking}</td>
                        <td>{parkingLot.capacity}</td>
                    </tr>
                    
                    {parkingLot.inventory ? (
                        <>
                        <h2>Inventory</h2>
                        {parkingLot.inventory.map((inv) => (
                            <>
                            <p>Start Date : {new Date(parseInt(inv.startDate)).toLocaleDateString()}</p>
                            <p>Price : {inv.price}</p>
                            </>
                        ))}
                        </>
                    ):null}
                    </>
                ))}           

                  </table>
                </>
            ):null}
            
        </>
     ) : null}

    </>)
}
{/* <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3> */}
export default Profile;