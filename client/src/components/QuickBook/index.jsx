import React from 'react';
import './style.scss';

const Quickbook = () => {
    return (<>
        <main className='quickBook'>
            <div className='mainBubble'>
            <form action="submit">
                    <div className='locSearch'>
                        <label htmlFor="quickBookSearchLocation">Location</label>
                        <input name='quickBookSearchLocation' placeholder='where to?' type="text" />
                    </div>
                    <div className='dateSearch'>
                        <label htmlFor="quickBookDateSearch">Date</label>
                        <input type="date"/>
                    </div>
                    <div className='prefSearch'>
                        <label htmlFor="preferenceSearch">Preferences</label>
                        <select name="preferenceSearch" id="preferenceSearch">
                            <option value="">indoor</option>
                            <option value="">outside</option>
                            <option value="">i dont care</option>
                        </select>
                    </div>
                    <div>
                        <button type='submit'>🔍</button>
                    </div>
                </form>
            </div>
        </main>
    </>
    )
}

export default Quickbook;