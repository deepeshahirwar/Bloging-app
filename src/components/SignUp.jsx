import React,{useState} from 'react' 
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form' 
import authService from '../appwrite/auth' 
import {Button , Input} from './index'
import { useDispatch } from 'react-redux' 
import { login } from '../store/authSlice'

function SignUp() { 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register,handleSubmit} = useForm();
    const [error, setError] = useState(""); 
 
    const signUp = async (data) => { 
      setError("");
        try {
        const session =    await authService.createAccount(data);
          if(session){
          const userData = await authService.getCurrentUser();
          if(userData)
           dispatch(login(userData)); 
          navigate('/');
           
          }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <div className='w-full  flex items-center justify-center'>
    <div className={`mx-auto w-full max-w-lg bg-gray-200
    rounded-md p-10 border border-black/10`}>
      <div  className='mb-2 flex justify-center'>
         
         <span className='inline-block w-full max-w-[100px]'>
            <h2>Logo</h2>
         </span>

      </div>  
       
       <h2 className='text-2xl font-bold text-center leading-tight'>
        Sign in to your account
       </h2> 

       <p  className='mt-2 text-center text-base text-black/60'>
         Already have an account?&nbsp;
         <Link
         to='/signup'
         className='font-semibold text-primary 
          transition-all duration-200 ease-in-out
           hover:text-primary/70 underline'
         > 
         Sign In
         </Link>
       </p> 

       {/* for error display */}
       {error && <p className='text-center mt-8
        text-red-600'>
        {error}</p>}


        {/* login form */}
        <form onSubmit={handleSubmit(login)}
        className='mt-8 '> 
        <div className='space-y-5'>  

            <Input
            type='text'
            label='Full Name'
             placeholder='Enter your full name'
             {...register('name',{
              required:true
             })}
            />

          <Input
          type='email'
          label='Email'
           placeholder='Enter your email'
           {...register('email',{
            required:true,
            validate: {
              matchPattern:(value) => /^[A-Z0-9._%+-]+@ [A-Z0-9.-]+\.[A-Z]{2,}$/i.
              test(value) || 'Invalid email address'
            }
           })}
          />  

          <Input
          type='password'
          label='Password'
           placeholder='Enter your password'
           {...register('password',{
            required:true
           })}
          />

          

          <Button
          type='submit'
          className='w-full'
          >Create New Accound</Button>

        </div>

        </form>

      </div> 
    </div>
  )
}

export default SignUp