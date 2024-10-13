import React from 'react'
import { useDispatch } from 'react-redux' 
import {logout} from '../../store/authSlice' 
import authService from '../../appwrite/auth'
function LogoutBtn() { 

    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
      
    }
    // log out button
  return ( 
    
    <div className='text-white cursor-pointer inline-block
    px-6 py-2 duration-200 ease-in-out
     hover:bg-blue-200 rounded-md'> 
  
   Logout
    </div> 

  )
}

export default LogoutBtn