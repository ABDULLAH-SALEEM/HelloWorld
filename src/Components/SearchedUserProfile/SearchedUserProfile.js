import React from 'react';
import {  Button } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import Header from '../Header/Header';
import './SearchedUserProfile.css';
import NameSearchedUser from '../AvatarNameSearchedUsers/NameSearchedUser';
import SearchedUserBio from './SearchedUserBio';
import SearchedUserProfileAvatar from './SearchedUserProfileAvatar';
import SearchedUserCover from './SearchedUserCover';
import SearchedUserPostPreview from '../PostPreviews/SearchedUserPostPreview/SearchedUserPostPreview';

const SearchedUserProfile = () => {

    return (
        <div>
            <div className='mainHeader'>
                <Header />
                <SearchedUserCover />
                <SearchedUserProfileAvatar />
                <div className='currentProfileName'><NameSearchedUser /></div>
                <div className='currentProfileBio'><SearchedUserBio /></div>
                <div className='divider'><Divider /></div>
                <div className='profileItems'>
                    <div className='profileItemsLeft'>
                        <h4>Posts</h4>
                        <h4>About</h4>
                        <h4>Friends</h4>
                        <h4>Photos</h4>
                        <h4>Videos</h4>
                    </div>
                    <div className='profileItemsRight'>
    
                        <div>hello</div>
                        
                    </div>
                </div>
            </div>

            <div className='mainProfileBody' >
                <div className='profileBodyItems'>
                    <div className='profileSideBarBox'>
                        <div className='profileSidebar'>
                            <h3>Intro</h3><br />
                            <Button className='profileSideBarOptions' variant="contained">Edit Details</Button><br /> <br />
                            <Button className='profileSideBarOptions' variant="contained">Add Hobbies</Button> <br /> <br />
                            <Button className='profileSideBarOptions' variant="contained">Add Featured</Button>
                        </div>
                        <div className='profileSidebarMiddle'><h3>Photos</h3><p>See All Photos</p></div>
                        <div className='profileSidebarBottom'><h3>Friends</h3><p>See All Friends</p></div>
                    </div>

                    <div className='profileRightItems'>
                        <div className='profileCreatePost'> <SearchedUserPostPreview /></div>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default SearchedUserProfile
