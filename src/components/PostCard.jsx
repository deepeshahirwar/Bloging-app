import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, image }) {
  return (
    <Link
      to={`/post/${$id}`}
      className=" block transform hover:scale-105 transition-transform duration-300"
    >
      <div
        className="bg-gradient-to-b bg-slate-800 shadow-lg overflow-hidden 
        w-full sm:max-w-sm lg:max-w-md mx-auto"
      >
        {/* Image Container */}
        <div className="w-full">
          <img
            src={appwriteService.getFilePreview(image)}
            alt={title}
            className="w-full h-40 md:h-52 lg:h-64 object-cover"
          />
        </div>

        {/* Post Title */}
        <div className="p-4 flex flex-col text-left space-y-2">
          <h2 className="text-lg md:text-xl font-bold font-sans text-gray-100 leading-tight truncate">
            {title}
          </h2>
          <p className="text-sm md:text-base text-gray-300 font-sans line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. This post
            was written by Deepesh...
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
