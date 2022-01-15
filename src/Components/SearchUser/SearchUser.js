import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { collection, query, getDocs } from 'firebase/firestore'
import { useParams } from 'react-router-dom';
import { db } from '../Firebase/Firebase';
import { Avatar } from '@material-ui/core';
import './SearchUser.css'

const SearchUser = () => {

    const [filter, setFilter] = useState('mm');
    const [userArr, setUsersArr] = useState([]);
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);

    const onSearchChangeHandler = (e) => {
        setFilter(e.target.value)
    }
    useEffect(async () => {
        const q = query(collection(db, "users"));
        let users = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            users.push(doc.data())
        });
        setUsersArr(users)
    }, [filter])
    

    return (
        <div>
            <input type="checkbox" id="check" className='searchCheck' />
            <label for="check">
                <div className='searchIcon'><SearchIcon /></div>
            </label>
            <div className='searchBarDiv'>
                <div className='searchArea'>
                    <SearchIcon /> <input className='searchInput' type='text' placeholder='Search Friends' onChange={onSearchChangeHandler} />
                </div>
                {userArr.filter((val) => {
                    if (filter == '') {
                        return ('')
                    } else if (val.name.toLowerCase().includes(filter.toLowerCase())) {
                        return (val)
                    }
                }).map((element, pos) => {
                    const linkTo=`/user/${element.userUid}`
                
                    const onClickHandler=()=>{
                        const searchedUserUid = {
                            searchedUserId: element.userUid
                        }
                        localStorage.setItem('currentSearchedUser', JSON.stringify(searchedUserUid))     
                    }
                    return (
                        
                        (currentUser.uid == element.userUid) ?  <div key={pos} className='searchResult'><Avatar className='searchAvatar' src={element.AvatarUrl} /><Link className='searchUserName' to='/profile' ><p  onClick={onClickHandler}>{element.name}</p></Link></div> : <div key={pos} className='searchResult'><Avatar className='searchAvatar' src={element.AvatarUrl} /><Link className='searchUserName' to={linkTo} ><p  onClick={onClickHandler}>{element.name}</p></Link></div>
                       
                    )
                })}

            </div>

        </div>
    )
}

export default SearchUser
