import * as React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import template from "./template.jpg";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc, collection, query, where, onSnapshot } from 'firebase/firestore'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { db } from '../Firebase/Firebase';
import './CreatePost.css';
import AvatarName from '../AvatarNameCurrentUser/AvatarName';
import CurrentAvatar from '../AvatarNameCurrentUser/CurrentAvatar';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const CreatePost = () => {
    const placeHolder = "What's on your Mind.";
    const [url, setUrl] = useState(null);
    const [postCaption, setPostCaption] = useState("");
    const [progress, setProgress] = useState("");
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    const storage = getStorage();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [logedinUserName, setLogedinUserName] = useState([]);
    const [logedinUserAvatarUrl, setLogedinUserAvatarUrl] = useState([]);
    let postName = ""

    useEffect(() => {
        if (currentUser) {
            const qry = query(collection(db, "users"));
            const q = query(qry, where("userUid", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setLogedinUserName((doc.data().name))
                    setLogedinUserAvatarUrl((doc.data().AvatarUrl))
                });

            });
        }
    }, [])


    const onImageChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            postName = file.name
            uploadHandler(file)
        }
    }

    const onPostCaptionChangeHandler = (e) => {
        setPostCaption(e.target.value);
    }

    const uploadHandler = (files) => {
        const storangeRef = ref(storage, `Posts/${postName}`);
        const uploadTask = uploadBytesResumable(storangeRef, files)
        uploadTask.on("state_changed", (snapshot) => {
            const prog = "Progress: " + Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) + " %";
            setProgress(prog);
        },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        setUrl(url);
                    })
            }
        )
    }
    const setPost = () => {
        const head = Date.now().toString(36);
        const tail = Math.random().toString(36).substring(2);
        const random = head + tail;
        let dateTime = new Date();
        let date = dateTime.toLocaleString('en-US');
        date.toString();

        setDoc(doc(db, 'usersPosts', random), {
            userUid: currentUser.uid,
            Url: url,
            postDescription: postCaption,
            names: logedinUserName,
            AvatarUrl: logedinUserAvatarUrl,
            PostDateTime: date,
            postId: random,
            timeStamp:dateTime.getTime()
        })
        setOpen(false)
    }

    return (
        <div className='main'>
            <div className='createPost' onClick={handleOpen}>
                <div className='createPostHeader' >
                    <CurrentAvatar className='postAvatar' />
                    <div className='createPostHeaderInput' >{placeHolder}</div>
                </div>
                <div className='createPostFotter' >
                    <Button variant="text"> <LiveTvIcon className='video' /> Live Video</Button>
                    <Button variant="text"> <PhotoLibraryIcon className="photo" /> Photo/Video</Button>
                    <Button variant="text"> <SentimentSatisfiedAltIcon className='activity' /> Feeling/Activity</Button>
                </div>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <p className='postHeading'>Create Post</p>
                        <div className='postBody' >
                            <AvatarName />
                        </div>
                        <div className='postContent'>

                            <input className='postContentText' placeholder={placeHolder} onChange={onPostCaptionChangeHandler} type="text" />
                        </div>
                        <label for='image'>
                            <p className='uploadImageHeading'> <PhotoCameraIcon /> Upload Image/Video</p>
                            <div className='imageUploadpreview'>
                                <img className='image' value={url} src={url} />
                            </div>
                        </label>
                        <div className='uploadimage'>
                            <input id='image' type="file" onChange={onImageChangeHandler} />
                        </div>
                        <div className='progress'><h4>{progress}</h4></div>
                        <Button onClick={setPost} variant="contained" className='upload'>Upload</Button>
                    </Box>
                </Fade>
            </Modal>

        </div>
    )
}

export default CreatePost
