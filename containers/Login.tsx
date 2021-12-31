import {useSockets} from "../context/socket.context";
import {useEffect, useRef} from "react";
import classes from '../styles/Login.module.css';

const Login = () => {

    const {socket, username, setUsername} = useSockets();
    const usernameRef = useRef(null);

    const handleSetUsername = () => {
        const value = usernameRef.current.value;
        if (!value) {
            return;
        }

        setUsername(value);
        localStorage.setItem('username', value);
    }

    useEffect( () => {
        if(usernameRef)
            usernameRef.current.value = localStorage.getItem('username') || '';
    }, [])

    return <div className={classes.Login}>
        <h1 className={classes.Title}>Set your username to start chatting!</h1>
        <div className={classes.Form}>
            <input type="text" placeholder={'Username'} ref={usernameRef}/>
            <button onClick={handleSetUsername}>Start messaging</button>
        </div>
    </div>
}

export default Login;