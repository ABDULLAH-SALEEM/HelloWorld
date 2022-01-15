import React, { useState, useEffect } from 'react'
import {  collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import './SearchedUserProfile.css';

const SearchedUserBio = () => {

    const [bio, setBio] = useState('');
    let searchedUser = localStorage.getItem('currentSearchedUser');
    searchedUser = JSON.parse(searchedUser);

    useEffect(() => {
            const qry = query(collection(db, "users"));
            const q = query(qry, where("userUid", "==", searchedUser.searchedUserId));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setBio((doc.data().UserBio))
                });

            });
       
    }, [])

    return (
        <div>
            <div className='editButton'>
                <h5>{bio}</h5>
            </div>
        </div>
    )
}

export default SearchedUserBio
