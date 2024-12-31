import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    
    const [bottomPosts, setBottomPosts] = useState([]);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    // Fetch the current post by slug
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    // Fetch recent posts (for right sidebar and bottom section)
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
               
                setBottomPosts(posts.documents.slice(0, 6));  // Fetching 6 posts for bottom section
            }
        });
    }, []);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.image);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 flex flex-col items-center justify-center text-center">
        <Container>
          {/* Main Post Section */}
          <div className="flex flex-col items-center w-full">
            <div className="w-full lg:w-3/4 text-center">
              <div className="w-full mb-6">
                <h1 className="text-2xl font-bold text-gray-100">{post.title}</h1>
              </div>
      
              {/* Image Section */}
              <div className="w-full flex justify-center mb-4 relative p-2">
                <img
                  src={appwriteService.getFilePreview(post.image)}
                  alt={post.title}
                  className="h-full w-full"
                />
                {/* Author Actions */}
                {isAuthor && (
                  <div className="absolute right-6 top-6">
                    <Link to={`/edit-post/${post.$id}`}>
                      <Button bgColor="bg-green-500" className="mr-3">
                        Update
                      </Button>
                    </Link>
                    <Button bgColor="bg-red-500" onClick={deletePost}>
                      Delete
                    </Button>
                  </div>
                )}
              </div>
      
              {/* Post Content */}
              <div className="font-sans text-xl mt-6 text-left">{parse(post.content)}</div>
            </div>
          </div>
      
          {/* Bottom Section (6 Recent Posts) */}
          <div className="mt-12 w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold font-sans mb-6 text-black">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bottomPosts.map((post) => (
                <Link
                  key={post.$id}
                  to={`/post/${post.$id}`}
                  className=" bg-gray-800 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={appwriteService.getFilePreview(post.image)}
                    alt={post.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-100">{post.title}</h3>
                    <p className="text-sm mt-2 text-gray-200 font-sans">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia expedita repellat sed ratione ...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div> ) : null;
}
