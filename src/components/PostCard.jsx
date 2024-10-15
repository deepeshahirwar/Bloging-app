import React from 'react' 
import appwriteService from '../appwrite/config'

function PostCard({$id, title, image}) {
  return (
      <Link>
      <div className='w-full bg-gray-200 rounded-sm px-4'>
        <div className='w-full justify-center mb-4'>
 
         <img  src={appwriteService.getFilePreview
            (image)}
         />
        </div>

        <h2 className='text-xl font-bold mb-2 mt-1'>
          {title}
        </h2>
      </div>
      </Link>
  )
}

export default PostCard