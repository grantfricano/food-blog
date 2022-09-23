import React, { useState, useEffect } from 'react';

function CreateAccount() {
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');


    function CreateUser() {
        const request = {
            username: username,
            password: password
          }

          fetch('http://localhost:4100/accounts/', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(request)
          })
            .then((response) => response.json())
    }

    return (
        <div>
            <label>Email</label>
            <input type="text" placeholder="Email Address" onChange={(event) => setUserName(event.target.value)}></input>
            <br />
            <label>Password</label>
            <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}></input>
            <br />
            <button type="submit" onClick={CreateUser}>Create</button>
        </div>
    )
} 

export default CreateAccount;
