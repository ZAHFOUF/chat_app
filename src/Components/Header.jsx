import React from 'react';
import metaData from '../metadata.json'

function Header() {
    return(
        <div className='header'>
            <div>
                <img src={metaData.main_icon} className='icon' alt="not found" /> <span className='context'>Chat app</span>
            </div>
        </div>


    )
}
export default Header