import React from 'react'
import NewsFeed from '../NewsFeed/NewsFeed';
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header';
import "./AppBody.css";

const AppBody = () => {
    return (
        <div>
            <div> <Header  /> </div>
            <div className='appBody'>
                <div className='sidebar'><Sidebar /></div>
                <div className='newsFeed' ><NewsFeed /></div>
            </div>
        </div>

    )
}

export default AppBody
