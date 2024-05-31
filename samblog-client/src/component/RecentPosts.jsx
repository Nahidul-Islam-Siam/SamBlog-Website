import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


const RecentPosts = ({blog}) => {
    const {_id,title,image,short_description,long_description,posted_date,category,author} = blog
    const {user} = useContext(AuthContext)
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate()
    const handleWish = async (blogId) => {
      if (!user) {
        return toast.error('You can not wished blog without login') 
      }
      if (wishlist.find(item => item._id === blogId)) {
       
        toast.error(`Blog post is already in the wishlist.`)
        return;
    }
    
      try {
      
          const blogData = {
              title,
              image,
              category,
              short_description,
              wish: {
                  email: user?.email,
                  name: user.displayName,
                  photo: user.photoURL,
              },
          };

     
          const { data } = await axios.post('https://samblog-server.vercel.app/wishlist', blogData);
        
       navigate('/wishlist')
          toast.success('Your blog post was successfully added to the wishlist');
          setWishlist([...wishlist, blog]);
      } catch (error) {
         
       
          toast.error('An error occurred while adding the blog post to the wishlist');
      }
  };

    return (
        <section className="bg-transparent  dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
        
  
          <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <img className="border-2 block transition duration-300 ease-out transform hover:scale-110 border-red-400 hover:transition-shadow shadow-transparent object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={image  || "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"} alt="" />
  
           
            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">
            <div className="flex items-center justify-start mt-4 mb-4">
       
       <a href="#" className="px-2 py-1 font-bold bg-red-400 text-white rounded-lg hover:bg-gray-500">{category}</a>
     </div>
  
              <a href="#" className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white">
                {title}
              </a>
  
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
               {short_description}
              </p>
  
              <a href="#" className="inline-block mt-2 text-blue-500 underline hover:text-blue-400">Read more</a>
  
              <div className="text-black flex items-center justify-between mt-6">
               <Link 
               to={`/blog/${_id}` }className="btn border-2 border-red-600 hover:bg-green-400">View Details</Link>
               <button  onClick={()=>handleWish(blog._id)} className="btn border-2 border-red-600 hover:bg-green-400">Wishlist</button>
               
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default RecentPosts;
