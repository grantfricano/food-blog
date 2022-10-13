import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import './Login.css';

import { UserContext } from '../../contexts/UserContext.js';

function Login( {isShowLogin, setIsShowLogin}) {
    
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');
    let [invalidPassword, setInvalidPassword] = useState(false);
    let [invalidUsername, setInvalidUsername] = useState(false);
    
    const {setUser, setToken} = useContext(UserContext);

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
                    setIsShowLogin(false);
                }
            })
    }
 
    return (
        <div className={`${!isShowLogin ? "active" : ""} show`}>
            <div className='login-box'>
                <div className='form-box solid'>
            
                    <br />
                    <input type="text" placeholder="Username" onChange={(event) => setUserName(event.target.value)}/>
                    <br />
                    {invalidUsername ? <label>Invalid Username<br/></label> : ''}
                    <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                    <br />
                    {invalidPassword ? <label>Invalid Password<br/></label> : ''}
                    <button type="submit" onClick={Authenticate}>Login</button>
                    <br /><br />
                    <Link to='/createaccount'>Create Account </Link><br />
                    <Link to='/forgotpassword'>Forgot Password</Link>
                </div>
            </div>
        </div>
    )
}



export default Login;