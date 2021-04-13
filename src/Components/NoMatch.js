import React from 'react';
import {useLocation} from 'react-router-dom';
import errImage from '../Images/404/404.svg';


function NoMatch() {
    // 404 error page for invalid url
    return (
        <div className="tab404">
            <img src={errImage} className="error404" alt="mutualism 404"/>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
}
export default NoMatch;