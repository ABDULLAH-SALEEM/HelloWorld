import React from 'react';
import { Avatar } from '@material-ui/core';
import { collection, query, where, onSnapshot, addDoc, setDoc, doc, getDoc, orderBy } from 'firebase/firestore'
import { useState, useEffect } from "react";
import Divider from '@material-ui/core/Divider';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';
import { db } from '../../Firebase/Firebase';
import { Link } from 'react-router-dom';
import './AllPostPreviews.css'

const AllPostPreviews = () => {
    // const timestamp = db.FieldValue.serverTimestamp();
    // console.log(timestamp);
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    let [usersPost, setUsersPost] = useState([]);

    useEffect(() => {
        if (currentUser) {
            const qry = query(collection(db, "usersPosts"));
            const q = query(qry, orderBy('timeStamp', 'desc'));
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
    let avatarUrl = '';
    let dateTime = '';
    const userPreview = usersPost.map((element, pos) => {
        const linkTo=`/user/${element.userUid}`
        names = element.names
        postDes = element.postDescription;
        postUrl = element.Url;
        avatarUrl = element.AvatarUrl;
        dateTime = element.PostDateTime;
        const onClickHandler=()=>{
            const searchedUserUid = {
                searchedUserId: element.userUid
            }
            localStorage.setItem('currentSearchedUser', JSON.stringify(searchedUserUid))
        }

        return (
            < div key={pos} className='postPreviews' >
                
               { (currentUser.uid == element.userUid) ?  <div key={pos} className='avatarName'><Avatar src={avatarUrl} /><div className='allUserNameDate'><Link className='allUserName' to='/profile' ><p  onClick={onClickHandler}>{names}</p></Link><p className='allUserPreviewDateTime'>{dateTime}</p></div></div> : <div key={pos} className='avatarName'><Avatar src={avatarUrl} /><div className='allUserNameDate'><Link className='allUserName' to={linkTo} ><p  onClick={onClickHandler}>{names}</p></Link><p className='allUserPreviewDateTime'>{dateTime}</p></div></div>}
                {/* <div className='avatarName' ><Avatar src={avatarUrl} /> <div><h4>{names}</h4></div></div> */}
                <div>{postDes}</div>
                <div className='img' ><img src={postUrl} /></div>
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

export default AllPostPreviews
