import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import GroupsIcon from '@material-ui/icons/GroupAdd';
import MapsUgcIcon from '@material-ui/icons/Message';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { Link } from 'react-router-dom';
import HeaderDropDown from '../HeaderDropDown/HeaderDropDown';
import SearchUser from '../SearchUser/SearchUser';
import logo from './logo.png'

const Header = () => {
    return (
        <div className='header'>
            <div className='headerLeft'>
                <img src={logo} />
                <SearchUser />
            </div>
            <div className='headerMiddle'>
                <Link to='/home' className='headerMiddleOptionHome' ><div title='Home'  ><HomeIcon  /></div></Link>
                <div title='Friends' className='headerMiddleOption' > <PeopleIcon /></div>
                <div title='Watch' className='headerMiddleOption' ><SubscriptionsIcon /></div>
                <div title='Marketplace' className='headerMiddleOption' ><StorefrontIcon /></div>
                <div title='Groups' className='headerMiddleOption' ><GroupsIcon /></div>
            </div>
            <div className='headerRight'>
                <div className='headerRightOption'><MapsUgcIcon /></div>
                <div className='headerRightOption'><NotificationsActiveIcon /></div>
                <div className='headerRightOption'> <HeaderDropDown /> </div>
            </div>
        </div>
    )
}

export default Header;
