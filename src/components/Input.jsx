import React,{useId} from 'react'

const Input = React.forwardRef( function Input({
  labal,
  type = 'text',
  className = '',
  ...props
}, ref){ 

    const id = useId();
      return(
         <div className='w-full'>
           {labal && <label htmlFor={id} 
           className='inline-block mb-1 pl-1'>
            {labal}
            </label>}

            <input 
            type={type}
            className={`
          px-3 py-2 rounded-lg bg-white 
          text-black border border-gray-200 w-full 
          duration-200 outline-none focus:bg-gray-50
                ${className}`} 
                ref = {ref} 
                {...props}
                id ={id}
            /> 

         </div>
      )
})

export default Input