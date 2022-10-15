import React, { Component, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
 
function ForgotPassword({isForgotPW, setIsForgotPW, setIsShowLogin}) {

    let [emailAddress, setEmailAddress] = useState('');
    let [response, setResponse] = useState('');
    let [username, setUsername] = useState('');

    let navigate = useNavigate();
    
    function Reset() {
        const userAddress = {
            to: emailAddress,
            username: username
        }

        fetch(process.env.REACT_APP_API_URL + '/accounts/forgotpassword', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(userAddress)
          })
            .then((response) => response.json())
            .then((data) => {setResponse(data)})
            .then(navigate('/login'));
    }
    
    return (
        <>
        <div className={`${!isForgotPW ? "active-forgotpw" : ""} show-forgotpw`}>
            <div className='forgotpw-box'>
                <div className='forgotpw-form-box solid'>
                    <i className='fa-solid fa-x x-forgotpw' onClick={() => setIsForgotPW(false)}></i>
                    <label>Email Address</label>
                    <input type="text" placeholder='email address' onChange={(event) => setEmailAddress(event.target.value)}/>
                    <br/>
                    <label>Username</label>
                    <input type="text" placeholder='username' onChange={(event) => setUsername(event.target.value)}/>
                    <br /><br />
                    <button type='submit' onClick={Reset} >Submit</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default ForgotPassword;