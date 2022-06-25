import React, { useState } from 'react'
import UserContext from './UserContext'

const UserState = (props) => {
    const [loggedin, setLoggedin] = useState(false)
    
  return (
    <UserContext.Provider value={{loggedin,setLoggedin}}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserState