import { useState , useEffect} from 'react'  
import {useDispatch} from 'react-redux'
import React from 'react';
import {Outlet} from 'react-router-dom'
import './App.css' 
import './index.css' 
import authService from './appwrite/auth' 
import {login,logout} from './store/authSlice'
import { Footer, Header } from './components/index';


function App() {
  
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch(); 

  useEffect(() => { 
    authService.getCurrentUser()
    .then((userData) => {
       if(userData){
        dispatch(login({userData}))
       }else{
        dispatch(logout({useDispatch:null}))
       }
    }) 
    .finally(() => {
      setLoading(false);
    });

  }, []); 

// home page data rendering 

return !loading ? (
  <div className='min-h-screen flex flex-col
    bg-black-400 text-3xl
   items-center justify-center'>

    <div className=''>
      <Header />
      <main >  
      TODO:  <Outlet />
      </main>
      <Footer />
    </div>
  </div>
) : null;

  
}

export default App
