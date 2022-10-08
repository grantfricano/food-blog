import React, { Component, useState} from 'react'

function ForgotPassword() {

    let [emailAddress, setEmailAddress] = useState('');
    let [response, setResponse] = useState('');
    
    function Reset() {
        const userAddress = {
            to: emailAddress
        }

        fetch(process.env.REACT_APP_API_URL + '/accounts/resetpassword', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(userAddress)
          })
            .then((response) => response.json())
            .then((data) => {setResponse(data)})
    }
    
    return (
        <>
            <label>Email Address</label>
            <input type="text" placeholder='email address' onChange={(event) => setEmailAddress(event.target.value)}/>
            <button type='submit' onClick={Reset} >Submit</button>
        </>
    )
}

export default ForgotPassword;