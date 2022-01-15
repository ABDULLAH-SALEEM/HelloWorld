import React from 'react';
import { Avatar } from '@material-ui/core';
import { collection, query, where, onSnapshot, addDoc, setDoc, doc } from 'firebase/firestore'
import { useState, useEffect } from "react";
import Divider from '@material-ui/core/Divider';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';
import { db } from '../../Firebase/Firebase';
import './LoggedInPostPreview.css'
import CurrentAvatar from '../../AvatarNameCurrentUser/CurrentAvatar';
import CurrentName from '../../AvatarNameCurrentUser/CurrentName';

const LoggedInPostPreview = () => {

    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    let [usersPost, setUsersPost] = useState([]);

    useEffect(() => {
        if (currentUser) {
            const qry = query(collection(db, "usersPosts"));
            const q = query(qry, where("userUid", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const usersPostArr = [];
                querySnapshot.forEach((doc) => {
                    usersPostArr.push(doc.data())
                });
                setUsersPost(usersPostArr)
            });
        }
    }, [])

    let postDes = '';
    let postUrl = '';
    let names = '';
    // let param = '';
    let avatarUrl='';
    let dateTime='';
    const userPreview = usersPost.map((element, pos) => {
        // param = `/home/${element.userUid}`;
        names = element.names;
        postDes = element.postDescription;
        postUrl = element.Url;
        avatarUrl = element.AvatarUrl;
        dateTime = element.PostDateTime;

        return (
                < div key={pos} className='postPreviews' >
                    <div className='avatarName' ><CurrentAvatar /> <div><h4><CurrentName /></h4><h6>{dateTime}</h6></div></div>
                    <div>{postDes}</div>
                    <div className='img' ><img  src={postUrl} /></div>
                    <Divider />
                    
                    <div className='action' >
                        <div className='subAction'> <ThumbUpOutlinedIcon /> Like</div>
                        <div className='subAction'> <ChatBubbleOutlineOutlinedIcon /> Comment</div>
                        <div className='subAction'> <ReplyOutlinedIcon /> Share</div>
                    </div>
                </div >   
        )
    })

    return (
        <div className='main'>
                {userPreview}
        </div>
    )
}

export default LoggedInPostPreview
