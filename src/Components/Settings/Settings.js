import React from 'react';
import SettingsIcon from '@material-ui/icons/SettingsApplicationsTwoTone';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import LockIcon from '@material-ui/icons/Lock';
import SecurityIcon from '@material-ui/icons/Security';
import BlockIcon from '@material-ui/icons/Block';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PublicIcon from '@material-ui/icons/Public';
import ExplicitIcon from '@material-ui/icons/Explicit';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { Divider } from '@material-ui/core';
import CurrentName from '../AvatarNameCurrentUser/CurrentName';
import EmailSettings from './EmailSettings/EmailSettings';
import PasswordSettings from './PasswordSettings/PasswordSettings';
import NameSettings from './NameSettings/NameSettings';
import CurrentEmail from '../AvatarNameCurrentUser/CurrentEmail';
import Header from '../Header/Header';
import './Settings.css';

const Settings = () => {
    return (
        <div>
            <Header />
            <div className='settings' >
                <div className='sideBar'>
                    <h2>Settings</h2>
                    <div className='settingsOpt'>
                        <div className='settingsSubOpt-general' ><SettingsIcon /><h4>General</h4></div>
                        <div className='settingsSubOpt'><DataUsageIcon /><h4>Your Information</h4></div>
                        <div className='settingsSubOpt'><LockIcon /><h4>Security And Login</h4></div>
                        <div className='settingsSubOpt'><SecurityIcon /><h4>Privacy</h4></div>
                        <div className='settingsSubOpt'><BlockIcon /><h4>Blocking</h4></div>
                        <div className='settingsSubOpt'><LocationOnIcon /><h4>Location</h4></div>
                        <div className='settingsSubOpt'><PublicIcon /><h4>Public Post</h4></div>
                        <div className='settingsSubOpt'><ExplicitIcon /><h4>Language and region</h4></div>
                        <div className='settingsSubOpt'><LocalOfferIcon /><h4>Profile and tagging</h4></div>

                    </div>
                </div>
                <div className='settingsArea'>
                    <h2>General Account Settings</h2>
                    <Divider />
                    <div className='name'> <h3> Name: </h3><CurrentName /><NameSettings /></div>
                    <Divider />
                    <div className='emaill'><h3> Email: </h3><CurrentEmail /><EmailSettings /></div>
                    <Divider />
                    <div className='passwordd'><h3> Password: </h3>*************<PasswordSettings /></div>
                    <Divider />
                </div>
            </div>

        </div>
    )
}

export default Settings
