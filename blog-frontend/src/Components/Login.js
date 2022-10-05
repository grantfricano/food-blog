import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { UserContext } from '../contexts/UserContext.js';

function Login() {
    
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');
    
    const {token, setToken} = useContext(UserContext);
    const {user, setUser} = useContext(UserContext);

    let navigate = useNavigate();


    function Authenticate() {

        const loginInfo = {
            username: username,
            password: password
        }

        setUser(username);

        fetch('http://localhost:4100/token', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(loginInfo)
          })
            .then((response) => response.json())
            .then((data) => {setToken(data.token)})
            .then(navigate('/'));
        }
 
    return (
        <div>
            <label>User Name</label>
            <input type="text" placeholder="Username" onChange={(event) => setUserName(event.target.value)}/>
            <br />
            <label>Password</label>
            <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
            <br />
            <button type="submit" onClick={Authenticate}>Login</button>
            <br /><br />
            <Link to='/createaccount'>Create Account </Link>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

export default Login;