import { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { auth, db } from '../Firebase/Firebase';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useNavigate } from 'react-router';
import './Signup.css';

const Signup = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");
    const navigate = useNavigate();
    const [errorMs, setError] = useState('Firebase: Error (auth/')
    let newmsg=errorMs.replace('Firebase: Error (auth/','')
    let msg=newmsg.replace('Firebase:','')
    let err=msg.replace('(auth/weak-password','')
    let formatedMsg=err.replace(')','')

    const onFullNameChangeHandler = (e) => {
        setFullName(e.target.value);
    }

    const onEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const onCnfPasswordChangeHandler = (e) => {
        setCnfPassword(e.target.value);
    }

    const onFormSubmitHandler = (e) => {
        e.preventDefault();
        if (password == cnfPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    let user = userCredential.user;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    navigate('/home');
                    // Signed in
                    setDoc(doc(db, 'users', user.uid), {
                        name: fullName,
                        email: email,
                        password: password,
                        userUid: user.uid,
                        AvatarUrl: null,
                        UserBio:'No Bio Added'
                    })
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    setError(errorMessage)
                })
        }else{
            setError("Password doesn't match")
        }
    }

    return (
        <div className='signupWraper'>
            <p className='signupHeading'>Hello World</p>
            <div className='signupFormDiv'>
                <form onSubmit={onFormSubmitHandler} className='signupForm' >
                    <TextField className="fullName" id="standard-basic" value={fullName} onChange={onFullNameChangeHandler} label="Enter Full Name" variant="standard" />
                    <TextField className="email" type='email' id="standard-basic" value={email} onChange={onEmailChangeHandler} label="Enter Email" variant="standard" />
                    <TextField className="password" type='password' id="standard-basic" value={password} onChange={onPasswordChangeHandler} label="Enter Password" variant="standard" />
                    <TextField className="cnfPassword" type='password' id="standard-basic" value={cnfPassword} onChange={onCnfPasswordChangeHandler} label="Confirm Password" variant="standard" />
                    <Button className="login" type='submit' variant="outlined">Signup Now</Button>
                    <p className='err'>{formatedMsg}</p>
                    <Link to="/" className="backToSignin"><Button variant="standard">Already Registered? Login Now.</Button></Link>
                </form>
            </div>
        </div>
    )
}

export default Signup
