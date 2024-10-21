import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, image}) {
  return (
    <Link to={`/post/${$id}`} className="block transform hover:scale-105 transition-transform duration-300">
      <div className="w-full bg-gradient-to-b from-gray-700 to-gray-800
       rounded shadow-lg overflow-hidden
       ">
        {/* Image Container */}
        <div className="w-full">
          <img
            src={appwriteService.getFilePreview(image)}
            alt={title}
            className="w-full h-40 object-cover rounded-t"
          />
        </div>

        {/* Post Title */}
        <div className="p-4 flex flex-col text-left">
          <h2 className="text-lg font-bold text-gray-100 leading-tight ">{title}</h2> 
          {/* todo: put contest from blog */}
          <p className='text-sm text-gray-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. This post written by Deeepesh ,This post written by Deeepesh... </p>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
