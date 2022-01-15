import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core';
import { collection, query, where, onSnapshot} from 'firebase/firestore'
import { db } from '../Firebase/Firebase';

const NameSearchedUser = () => {

    let searchedUser = localStorage.getItem('currentSearchedUser');
    searchedUser = JSON.parse(searchedUser);
    const [searchedUserName, setSearchedUserName] = useState();

    useEffect(() => {
            const qry = query(collection(db, "users"));
            const q = query(qry, where("userUid", "==", searchedUser.searchedUserId));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setSearchedUserName((doc.data().name))
                });

            });
       
    }, [])

    return (
        <div>
            {searchedUserName}
        </div>
    )
}

export default NameSearchedUser
