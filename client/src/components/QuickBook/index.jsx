import React from 'react';
import SearchInput from '../SearchInput';
import FindMeBtn from '../FindMeBtn';
import { Link, Redirect } from "react-router-dom";
import './style.scss';
import { todaysDate } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MAP_DATE, UPDATE_QUERY_CITY } from '../../utils/actions';

import { getGeocode } from 'use-places-autocomplete';

const Quickbook = () => {

    const [, dispatch] = useStoreContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        let place = event.target[0].value;

        getGeocode({address: place})
        .then(result => ((result[0].address_components.filter(place => place.types[0] === 'locality'))[0].long_name))
        .then(city => {
            dispatch({
                type: UPDATE_QUERY_CITY,
                mapCity: city
            });
        })

        let date = (event.target[1].value).toString();
        dispatch({
            type: UPDATE_MAP_DATE,
            mapDate: date
        });
        <Redirect to="/findparking" />
    }


    return (<>
        <main className='quickBook'>
            <div className='mainBubble'>
                <form onSubmit={handleSubmit} action="submit">
                    <div className='locSearch'>
                        <label htmlFor="quickBookSearchLocation">Location</label>
                        <SearchInput />
                    </div>
                    <div className='dateSearch'>
                        <label htmlFor="quickBookDateSearch">Date</label>
                        <input min={todaysDate()} type="date" />
                    </div>
                    <div className='buttonDiv'>

                            <button className='searchBtn' type='submit'>🔍</button>

                        <Link to='/findparking'>
                            <FindMeBtn className='qbFindMe' />
                        </Link>

                    </div>
                </form>
            </div>
        </main>
    </>
    )
}

export default Quickbook;