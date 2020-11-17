import React, { useContext, createContext, useState } from 'react'

export const UserContext = createContext()

function UserProvider(props) {
    const [authenticatedUser, setAuthenticatedUser] = useState()
    return(
        <UserContext.Provider value={[authenticatedUser, setAuthenticatedUser]}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider