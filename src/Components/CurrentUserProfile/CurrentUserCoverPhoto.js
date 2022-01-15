import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import './CurrentUserProfile.css';

const style={
    width:'100%',
    height:'100%',
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
}

const CurrentUserCoverPhoto = () => {

    const [coverPhotoUrl, setCoverPhotoUrl]=useState();
    const [coverPhoto, setCoverPhoto]=useState();
    const storage = getStorage();
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    let coverName='';

    const coverUrlChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            coverName = file.name
            uploadHandler(file);
        }
    }

    const uploadHandler = (files) => {
        const storangeRef = ref(storage, `ProfileCovers/${coverName}`);
        const uploadTask = uploadBytesResumable(storangeRef, files)
        uploadTask.on("state_changed", (snapshot) => {
        },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        setCoverPhotoUrl(url);
                        const avatarUrlRef = doc(db, "users", currentUser.uid);
                        updateDoc(avatarUrlRef, {
                            coverPhoto: url
                        });
                    })
            }
        )
    }

    useEffect(() => {
        if (currentUser) {
            const qry = query(collection(db, "users"));
            const q = query(qry, where("userUid", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setCoverPhoto((doc.data().coverPhoto))
                });

            });
        }
    }, [])

    return (
        <div className='coverPhoto'>
            <img src={coverPhoto} style={style} />
            <label for='coverPhoto' >
                <div className='coverPhotoButtonDiv'><PhotoCameraIcon />Add Cover Photo</div>
            </label>
            
            <input id='coverPhoto' type='file' onChange={coverUrlChangeHandler} />
        </div>
    )
}

export default CurrentUserCoverPhoto
