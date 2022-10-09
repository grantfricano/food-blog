import React, { Component, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

function ResetPassword() {
    
    let [newPassword, setNewPassword] = useState('');
    let navigate = useNavigate();

    let { resetToken } = useParams();

    function submitNewPassword() {

        const submission = {
            resetToken: resetToken,
            newPassword: newPassword
        }

        fetch(process.env.REACT_APP_API_URL + '/accounts/resetpassword', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(submission)
        })
            .then((response) => response.json())
            .then(navigate('/login'));
    }

    return (
        <>
            <label>Enter New Password</label>
            <input type="password" onChange={(e) => setNewPassword(e.target.value)}/>
            <button onClick={submitNewPassword}>Save</button>
        </>
    )
}

export default ResetPassword;