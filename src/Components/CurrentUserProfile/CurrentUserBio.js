import React, { useState, useEffect } from 'react'
import { doc, updateDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { db } from '../Firebase/Firebase';

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

const CurrentUserBio = () => {

    const [bio, setBio] = useState('Add bio');
    const [userBio, setUserBio]=useState('Add Bio')
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

    const updateNewBio = () => {
        const currentUserBioRef = doc(db, "users", currentUser.uid);
        updateDoc(currentUserBioRef, {
            UserBio: bio
        });
        setOpen(false);
    }


    const onBioChangeHandler = (e) => {
        setBio(e.target.value);
    }

    useEffect(() => {
        if (currentUser) {
            const qry = query(collection(db, "users"));
            const q = query(qry, where("userUid", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setUserBio((doc.data().UserBio))
                });

            });
        }
    }, [])

    return (
        <div>
            <div className='editButton' onClick={handleOpen}>
                <h5>{userBio}</h5>
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
                        <p className='bioSettings'>Edit Bio</p>
                        <TextField className="bioInput" id="standard-basic" onChange={onBioChangeHandler} label="Enter Bio" variant="standard" /><br />
                        <Button onClick={updateNewBio} variant="contained" className='saveBioChanges'>Save Changes</Button>
                    </Box>
                </Fade>
            </Modal>

        </div>
    )
}

export default CurrentUserBio
