import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import GroupsIcon from '@material-ui/icons/GroupAdd';
import StorefrontIcon from '@material-ui/icons/Storefront';
import HistoryIcon from '@material-ui/icons/History';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FlagIcon from '@material-ui/icons/Flag';
import SidebarRow from '../SidebarRow/SidebarRow';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './Sidebar.css';
import AvatarName from '../AvatarNameCurrentUser/AvatarName';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <AvatarName />
            <SidebarRow Icon={<PeopleIcon  className='sameClass'/>} title="Find Friends" />
            <SidebarRow Icon={<GroupsIcon className='sameClass' />} title="Groups" />
            <SidebarRow Icon={<StorefrontIcon className='sameClass' />} title="Marketplace" />
            <SidebarRow Icon={<SubscriptionsIcon className='sameClass' />} title="Watch" />
            <SidebarRow Icon={<HistoryIcon className='sameClass' />} title="Memories" />
            <SidebarRow Icon={<BookmarkIcon className='saved' />} title="Saved" />
            <SidebarRow Icon={<FlagIcon className='pages' />} title="Pages" />
            <SidebarRow Icon={<ArrowDropDownIcon className='seeMore' />} title="See more" />
            
        </div>
    )
}

export default Sidebar
