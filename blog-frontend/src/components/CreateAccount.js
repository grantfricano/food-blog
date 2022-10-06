import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function CreateAccount() {
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');
    let [uniqueName, setUniqueName] = useState(true);

    let navigate = useNavigate();

    function CreateUser() {
        const request = {
            username: username,
            password: password
          }

          fetch(process.env.REACT_APP_API_URL + '/accounts/', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(request)
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.message == 'Username already in use') {
                 setUniqueName(false);
                 return;
              } 
                setUniqueName(true);
                navigate('/login')
              
          })
            //.then(navigate('/login'));
    }

    return (
        <div>
            <label>Email</label>
            <input type="text" placeholder="Email Address" onChange={(event) => setUserName(event.target.value)}></input>
            <br />
            {uniqueName ? '' : <label>Username already in use<br/></label>}
            <label>Password</label>
            <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}></input>
            <br />
            <button type="submit" onClick={CreateUser}>Create</button>
        </div>
    )
} 

export default CreateAccount;
