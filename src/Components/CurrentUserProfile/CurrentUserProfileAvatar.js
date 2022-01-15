import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import './CurrentUserProfile.css';

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

const CurrentUserProfileAvatar = () => {
    const [dpSrc, setDpSrc] = useState();
    let dpName = "";
    const storage = getStorage();
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    const [logedinUserAvatarUrl, setLogedinUserAvatarUrl] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (currentUser) {
            const qry = query(collection(db, "users"));
            const q = query(qry, where("userUid", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setLogedinUserAvatarUrl((doc.data().AvatarUrl))
                });
            });
        }
    }, [])

    const dpSrcChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            dpName = file.name
            uploadHandler(file);
        }
    }

    const uploadHandler = (files) => {
        const storangeRef = ref(storage, `ProfileDp/${dpName}`);
        const uploadTask = uploadBytesResumable(storangeRef, files)
        uploadTask.on("state_changed", (snapshot) => {
        },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        setDpSrc(url);
                        const avatarUrlRef = doc(db, "users", currentUser.uid);
                        updateDoc(avatarUrlRef, {
                            AvatarUrl: url
                        });
                        const q = query(collection(db, "usersPosts"));
                        const unsubscribe = onSnapshot(q, (querySnapshot) => {
                            querySnapshot.forEach((doc1) => {
                                if (currentUser.uid == doc1.data().userUid) {
                                    const avatarRef = doc(db, "usersPosts", doc1.data().postId);
                                    updateDoc(avatarRef, {
                                        AvatarUrl: url,
                                    })
                                }
                            });
                        });
                    })
            }
        )
    }

    return (
        <div>
            <div className='profileAvatar'>
                <Avatar onClick={handleOpen} className='dpAvatar' src={logedinUserAvatarUrl} />
                <label for='profileDp'>
                    <div className='cameraIcon'>
                        <PhotoCameraIcon />
                    </div>
                </label>
                <input id='profileDp' type="file" onChange={dpSrcChangeHandler} />
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
                            <img className='profileDpPreview' src={logedinUserAvatarUrl} />
                        </Box>
                    </Fade>
                </Modal>

            </div >
        </div>
    )
}

export default CurrentUserProfileAvatar;
