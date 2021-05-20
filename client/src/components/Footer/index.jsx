import React from 'react';
import './style.scss';

const Footer = () => {
    return (<>
        <footer className="footer">
            <div className='credits'>
            <a href="https://github.com/bhumisha" className="github fa fa-github"> </a>
            <h2>Bhumisha<span className='didThis'>: Backend</span></h2>
            </div>
            <div className='credits'>
            <a href="https://github.com/yulduzetta" className="github fa fa-github"> </a>
            <h2>Yulduz<span className='didThis'>: Backend</span></h2>
            </div>
            <div className='credits'>
            <a href="https://github.com/akramsabbah9" className="github fa fa-github"> </a>
                <h2>Akram<span className='didThis'>: Frontend</span></h2>
            </div>
            <div className='credits'>
                <a href="https://github.com/benwade91" className="github fa fa-github"> </a>
                <h2>Ben<span className='didThis'>: Frontend</span></h2>
            </div>
        </footer>
    </>)
}

export default Footer;