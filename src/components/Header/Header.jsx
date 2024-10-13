import React from 'react'
import {Container, LogoutBtn} from '../index' 
import { Link } from 'react-router-dom' 
import { useSelector } from 'react-redux' 
import { useNavigate } from 'react-router-dom'
function Header() {  
  const authStatus = useSelector((state) => 
    state.auth.status)

  const navigate = useNavigate() 

  const navItems = [
    {
       name: 'Home',
       slug: '/',
       active: true
    },
    {
      name:'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name:'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name:'All Posts',
      slug:'all-posts',
      active: authStatus
    },
    { 
      name:'Add Post',
      slug:'add-post',
      active: authStatus

    }
  ]


  return (
    <header  className='py-3 shadow bg-gray-500'>
      <Container>
        <nav  className='flex '> 
          <div>
          <h1>Logo</h1> 
          </div> 
 
        <ul className='flex ml-auto'> 
          {navItems.map((item) => 
            item.active ? (
              <li key={item.name} className='mr-4'>
                 <button 
                 className='inline-block rounded-full
                  px-6 py-2 duration-200 hover:bg-blue-200 '
                 onClick={() => navigate(item.slug)}
                  >{item.name}</button> 
              </li>
            ) : null
          )} 
         {/* logout button logic */}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}


         
        </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header