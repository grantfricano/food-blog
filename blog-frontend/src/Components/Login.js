import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Login() {
    
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');

    let  [token, setToken] = useState('');

    function Authenticate() {

        const loginInfo = {
            username: username,
            password: password
        }

        fetch('http://localhost:4100/token', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(loginInfo)
          })
            .then((response) => response.json())
            .then((data) => {setToken(data.token)})
        }


    return (
        <div>
            <label>User Name</label>
            <input type="text" placeholder="Username" onChange={(event) => setUserName(event.target.value)}/>
            <br />
            <label>Password</label>
            <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
            <br />
            <button type="submit" onClick={Authenticate}>Submit</button>
            <br /><br />
            <Link to='/createaccount'>Create Account </Link>
        </div>
    )
}

export default Login;