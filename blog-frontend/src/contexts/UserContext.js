import React, { useContext, useState } from 'react';

const UserContext = React.createContext();

export function useUser() {
    useContext(UserContext);
}

export default function UserProvider( {children} ) {
    const [username, setUsername] = useState('');


    return (
        <UserContext.Provider value={username} >
            {children}
        </UserContext.Provider>
    )
}

