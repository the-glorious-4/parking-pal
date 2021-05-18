import React from 'react';
import SearchInput from '../SearchInput';
import FindMeBtn from '../FindMeBtn';
import { Link } from "react-router-dom";
import './style.scss';

const Quickbook = () => {

    const handleSubmit = (event) => {
        event.preventDefault();

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
                        <input type="date" />
                    </div>
                    {/* <div className='prefSearch'>
                        <label htmlFor="preferenceSearch">Preferences</label>
                        <select name="preferenceSearch" id="preferenceSearch">
                            <option value="">indoor</option>
                            <option value="">outside</option>
                            <option value="">i dont care</option>
                        </select>
                    </div> */}
                    <div className='buttonDiv'>
                        <Link to='/findparking'>
                            <button className='searchBtn' type='submit'>🔍</button>
                        </Link>
                        <FindMeBtn className='qbFindMe' />
                    </div>
                    {/* <div className='buttonDiv'>
                    <FindMeBtn className='qbFindMe' />
                </div> */}
                </form>
            </div>
        </main>
    </>
    )
}

export default Quickbook;