import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext'

function MyProfile() {

    const {user, setUser} = useContext(UserContext);

    return (
        <div>
            <label>Name </label>
            <input type="text" name="name" placeholder={user} readOnly></input>
        </div>
        
    )
}

export default MyProfile;   

