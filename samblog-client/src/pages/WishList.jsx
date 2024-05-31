import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";



const WishList = () => {
    const {user} = useContext(AuthContext)
    const [blogs, setBlogs] = useState([])


    useEffect(()=>{
        
        
        getData()
    },[user])
    const getData = async () => {
      const {data} = await axios.get(
          `https://samblog-server.vercel.app/wishlists/${user?.email}`
      
      )
      setBlogs(data)

     
  }


    const handleDelete = async(id) =>{
try{
const {data} = await axios.delete(`https://samblog-server.vercel.app/wishlist/${id}`)
toast.success('delete successfully')
getData()
}catch(err){
console.log(err);

}

    }
    return (
        <div>
          {
            blogs.length>1 ?
            <div>
            {
               blogs?.map(blog=>( 
                    <section key={blog?._id} className="bg-transparent dark:bg-gray-900">
               <div className="container px-6 py-10 mx-auto">
               
         
                 <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
                   <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={blog?.image  || "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"} alt="" />
         
                   <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">
                     <p className="text-sm text-blue-500 uppercase">{blog?.category}</p>
         
                     <a href="#" className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white">
                       {blog.title}
                     </a>
         
                     <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                      {blog.short_description}
                     </p>
         
                     <a href="#" className="inline-block mt-2 text-blue-500 underline hover:text-blue-400">Read more</a>
         
                     <div className="flex items-center justify-between mt-6">
                      <Link 
                      to={`/blog/${blog._id}` } className="btn btn-secondary border-2 border-red-500 hover:bg-green-400">View Details</Link>
                      <Link
                      onClick={()=>handleDelete(blog?._id)}
                       className="btn btn-primary border-2 border-red-500 hover:bg-green-400">Remove from Wishlist</Link>
                      
                     </div>
                   </div>
                 </div>
               </div>
             </section>
             ))
           }
          </div>  : <h1> <img className="w-screen" src="https://i.ibb.co/DkPPpQ5/nothing.jpg" alt="" /></h1>
          }
   
        </div>
    );
};

export default WishList;