import React from 'react';
import SearchInput from '../SearchInput';
import FindMeBtn from '../FindMeBtn';
import { Link, withRouter, useHistory } from "react-router-dom";
import './style.scss';
import { todaysDate } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MAP_DATE, UPDATE_QUERY_CITY, SET_LOADING } from '../../utils/actions';
import { getGeocode } from 'use-places-autocomplete';

import loading from '../../images/loading.gif';


const Quickbook = () => {

    let history = useHistory();

    const [state, dispatch] = useStoreContext();

    const handleSubmit = (event) => {
        
        event.preventDefault();
        let place = event.target[0].value;
        getGeocode({ address: place })
            .then(result => ((result[0].address_components.filter(place => place.types[0] === 'locality'))[0].long_name))
            .then(city => {
                dispatch({
                    type: UPDATE_QUERY_CITY,
                    mapCity: city
                });
            })
            .catch(err => console.log(err))

        let date = (event.target[1].value).toString();

        dispatch({
            type: UPDATE_MAP_DATE,
            mapDate: date
        })

        history.push('/findparking');
        
    }
    const handleLoad = () => {
        dispatch({type: SET_LOADING});
        setTimeout(()=>{dispatch({type: SET_LOADING})}, 4000)
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
                        
                        <button onClick={handleLoad} className='searchBtn' type='submit'>🔍</button>
                        
                        <Link onClick={handleLoad} id='findMeBtn' to='/findparking'>
                            <FindMeBtn className='qbFindMe' />
                        </Link>
                        {state.loadingGif && <img id='loadingGif' src={loading} alt="loading"/>}
                    </div>
                </form>
            </div>
        </main>
    </>
    )
}

export default withRouter(Quickbook);