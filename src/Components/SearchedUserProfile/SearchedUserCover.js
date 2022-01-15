import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import './SearchedUserProfile.css';

const style={
    width:'100%',
    height:'100%',
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
}

const SearchedUserCover = () => {

    const [coverPhoto, setCoverPhoto]=useState();
    let searchedUser = localStorage.getItem('currentSearchedUser');
    searchedUser = JSON.parse(searchedUser);

    useEffect(() => {
       
            const qry = query(collection(db, "users"));
            const q = query(qry, where("userUid", "==", searchedUser.searchedUserId));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setCoverPhoto((doc.data().coverPhoto))
                });

            });
        
    }, [])

    return (
        <div className='coverPhoto'>
            <img src={coverPhoto} style={style} />
        </div>
    )
}

export default SearchedUserCover;
