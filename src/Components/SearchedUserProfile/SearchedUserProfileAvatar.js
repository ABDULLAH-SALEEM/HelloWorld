import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import './SearchedUserProfile.css';

const SearchedUserProfileAvatar = () => {
    let searchedUser = localStorage.getItem('currentSearchedUser');
    searchedUser = JSON.parse(searchedUser);
    const [searchedUserAvatarUrl, setSearchedUserAvatarUrl] = useState();

    useEffect(() => {
      
            const qry = query(collection(db, "users"));
            const q = query(qry, where("userUid", "==", searchedUser.searchedUserId));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setSearchedUserAvatarUrl((doc.data().AvatarUrl))
                });

            });
        
    }, [])

    return (
        <div>
            <div className='profileAvatar'>
                <Avatar  className='dpAvatar' src={searchedUserAvatarUrl} />
            </div >
        </div>
    )
}

export default SearchedUserProfileAvatar;
