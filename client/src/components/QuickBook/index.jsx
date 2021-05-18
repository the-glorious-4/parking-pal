import React from 'react';
import SearchInput from '../SearchInput';
import FindMeBtn from '../FindMeBtn';
import { Link } from "react-router-dom";
import './style.scss';
import { todaysDate } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MAP_DATE } from '../../utils/actions';

const Quickbook = () => {

    const [state, dispatch] = useStoreContext();

    console.log(state);

    const handleSubmit = (event) => {
        event.preventDefault();
        // let place = event.target[0].value;
        let date = (event.target[1].value).toString();
        console.log(date);
        dispatch({
            type: UPDATE_MAP_DATE,
            mapDate: date
        })
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
                        <Link to='/findparking'>
                            <button className='searchBtn' type='submit'>🔍</button>
                        </Link>
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