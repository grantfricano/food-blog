import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from '../contexts/UserContext.js';

function Login() {
    
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');
    let [invalidPassword, setInvalidPassword] = useState(false);
    let [invalidUsername, setInvalidUsername] = useState(false);
    
    const {setUser, setToken} = useContext(UserContext);
    
    let navigate = useNavigate();

    function Authenticate() {

        const loginInfo = {
            username: username,
            password: password
        }

        fetch(process.env.REACT_APP_API_URL + '/token', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(loginInfo)
          })
            .then((response) => response.json())
            .then((data) => {
                if (data.message == 'invalid password') {
                    setInvalidUsername(false);
                    setInvalidPassword(true);

                }
                else if (data.message == 'user not found') {
                    setInvalidPassword(false);
                    setInvalidUsername(true);
                }
                else if (data.token) {
                    setToken(data.token);
                    setUser(username);
                    localStorage.setItem('token', JSON.stringify(data.token));
                    localStorage.setItem('username', JSON.stringify(username));
                    navigate('/');
                }
            })
    }
 
    return (
        <div>
            <label>User Name</label>
            <input type="text" placeholder="Username" onChange={(event) => setUserName(event.target.value)}/>
            <br />
            {invalidUsername ? <label>Invalid Username<br/></label> : ''}
            <label>Password</label>
            <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
            <br />
            {invalidPassword ? <label>Invalid Password<br/></label> : ''}
            <button type="submit" onClick={Authenticate}>Login</button>
            <br /><br />
            <Link to='/createaccount'>Create Account </Link>
        </div>
    )
}



export default Login;