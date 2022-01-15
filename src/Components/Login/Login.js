import { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setErrorMessage] = useState('')
    const url = 'https://apppracticeexpress.herokuapp.com/users'

    const onEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChangeHandler = (e) => {
        setPassword(e.target.value);
    }
    const [ancor, setAncor] = useState();
    const [errorMs, setError] = useState('Firebase: Error (auth/')
    let newmsg=errorMs.replace('Firebase: Error (auth/','')
    let formatedMsg=newmsg.replace(')','')
    const ancor1 = <a target='_blank' href={url}>here</a>

    const onFormSubmitHandler = async (e) => {
        e.preventDefault();

        // try {
        //     const res = await fetch('https://apppracticeexpress.herokuapp.com/users', {
        //         method: "GET",
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json"
        //         },
        //     })
            // const data = await res.json()
            // data.map((element, pos) => {
            //     if (element.user == email && element.password == password) {
                    signInWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            localStorage.setItem('currentUser', JSON.stringify(user))
                            navigate('/home');
                        })
                        .catch((error) => {
                            const errorCode = error.code
                            const errorMessage = error.message;
                            setError(errorMessage);
                        })

        //         } else {
        //             setErrorMessage("Wrong Credential, enter data from ");
        //             setAncor(ancor1)
        //         }
        //     })
        // } catch (error) {
        //     console.log(error)
        // }
    }

    return (
        <div className='loginWraper' >
            <p className='loginHeading'>FRIENDS</p>
            <p className='error'>{error}{ancor}</p>
            <div className='loginFormDiv'>
                <form onSubmit={onFormSubmitHandler} className='loginForm' >
                    <TextField className="email" type='email' id="standard-basic" value={email} onChange={onEmailChangeHandler} label="Enter Email" variant="standard" />
                    <TextField className="password" type='password' id="standard-basic" value={password} onChange={onPasswordChangeHandler} label="Enter Password" variant="standard" />
                    <Button className="login" type='submit' variant="outlined">Login</Button>
                    <p className='err'>{formatedMsg}</p>
                    
                    <Link to="signup" className="signup"> <Button variant="standard">Not Registered? Signup Now.</Button></Link>
                </form>
            </div>
        </div>

    )
}

export default Login
