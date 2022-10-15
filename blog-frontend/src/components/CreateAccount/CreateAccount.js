import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';


function CreateAccount( {isCreateAccount, setIsCreateAccount, setIsShowLogin}) {
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
                setIsCreateAccount(false);
                setIsShowLogin(true);
                          
          })
            //.then(navigate('/login'));
    }

    return (
      <div className={`${!isCreateAccount ? "active-create" : ""} show-create`}>
        <div className='create-box'>
          <div className='create-form-box solid'>
            <i className='fa-solid fa-x x-create' onClick={() => setIsCreateAccount(false)}></i>
            <input type="text" placeholder="Username" onChange={(event) => setUserName(event.target.value)}></input>
            <br />
            {uniqueName ? '' : <label>Username already in use<br/></label>}
            <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}></input>
            <br />
            <button className='create-submit-btn' type="submit" onClick={CreateUser}>Create</button>
          </div>
        </div>
      </div>
    )
} 

export default CreateAccount;
