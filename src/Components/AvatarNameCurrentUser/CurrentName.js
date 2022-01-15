import React, { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { Link } from 'react-router-dom';
import { db } from '../Firebase/Firebase';

const style = {
    textDecoration: 'none',
    color: 'black',
    cursor: 'pointer'
}

const CurrentName = () => {

    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    const [logedinUserName, setLogedinUserName] = useState([]);

    useEffect(() => {
        if (currentUser) {
            const qry = query(collection(db, "users"));
            const q = query(qry, where("userUid", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setLogedinUserName((doc.data().name))
                });

            });
        }
        // var usersRef = firebase.database().ref('users');
        // var adaRef = usersRef.child(currentUser.uid);
        // var adaFirstNameRef = adaRef.child('AvatarUrl');
        // var path = adaFirstNameRef.toString();
        // console.log(path);
    }, [])

    return (
        <div>
            <Link to='/profile' style={style} >{logedinUserName}</Link>

        </div>
    )
}

export default CurrentName
