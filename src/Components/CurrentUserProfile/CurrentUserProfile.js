import React from 'react';
import {  Button } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import Header from '../Header/Header';
import CreatePost from '../CreatePost/CreatePost'
import './CurrentUserProfile.css';
import CurrentName from '../AvatarNameCurrentUser/CurrentName';
import CurrentUserProfileAvatar from './CurrentUserProfileAvatar';
import LoggedInPostPreview from '../PostPreviews/LogedInPostPreviews/LoggedInPostPreview';
import CurrentUserCoverPhoto from './CurrentUserCoverPhoto';
import CurrentUserBio from './CurrentUserBio';

const CurrentUserProfile = () => {

    return (
        <div>
            <div className='mainHeader'>
                <Header />
                <CurrentUserCoverPhoto />
                <CurrentUserProfileAvatar />
                <div className='currentProfileName'><CurrentName /></div>
                <div className='currentProfileBio'><CurrentUserBio /></div>
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
                        <Button className='addToStory' variant="contained" color="primary">Add To Story</Button>
                        <div>hello</div>
                        <Button variant="outlined">Edit Profile</Button>
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
                        <div className='profileCreatePost'><CreatePost /></div>
                        <div className='profileCreatePost'> <LoggedInPostPreview /></div>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default CurrentUserProfile
