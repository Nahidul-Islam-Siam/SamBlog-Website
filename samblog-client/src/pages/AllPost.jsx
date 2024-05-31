import { useContext, useState } from "react";

import { AuthContext } from "../provider/AuthProvider";
import { Link, useLoaderData } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";



const AllPosts = () => {
    // const {_id,title,image,short_description,long_description,posted_date,category,author} = blog
   
    const { user, loading } = useContext(AuthContext);
    const [wishlist, setWishlist] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const blogs = useLoaderData()
    if(loading){
        return <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto animate-pulse">
            <h1 className="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
    
            <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>
    
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                <div className="w-full ">
                    <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>
    
                <div className="w-full ">
                    <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>
    
                <div className="w-full ">
                    <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>
    
                <div className="w-full ">
                    <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>
    
                <div className="w-full ">
                    <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>
    
                <div className="w-full ">
                    <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>
    
                <div className="w-full ">
                    <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>
    
                <div className="w-full ">
                    <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>
            </div>
        </div>
    </section>
       
      
    }
    const handleWish = async (blogId) => {
      const blog = blogs.find(blog => blog._id === blogId);
      if (!blog) {
        toast.error(`Blog post with id ${blogId} not found.`)
          
          return;
      }
      
      // Check if the blog post is already in the wishlist
      if (wishlist.find(item => item._id === blogId)) {
       
          toast.error(`Blog post is already in the wishlist.`)
          return;
      }
      
      // Prepare data to send to the backend
      const blogData = {
          title: blog.title,
          posted_date: blog.posted_date,
          image: blog.image,
          category: blog.category,
          short_description: blog.short_description,
          author: {
              email: user?.email,
              name: user?.displayName,
              photo: user.photoURL,
          },
          wishlist_date: new Date().toISOString(),
      };
  
      try {
          // Send a POST request to the backend to add the blog post to the wishlist
          const { data } = await axios.post('https://samblog-server.vercel.app/wishlist', blogData);
          console.log(data); // Log the response from the server
          // Update the local wishlist state
          setWishlist([...wishlist, blog]);
          toast.success('Blog post successfully added to wishlist');
         
      } catch (error) {
          console.error('Error adding blog post to wishlist:', error);
          toast.error('Failed to add blog post to wishlist');
          
      }
  };



  const filteredBlogs = blogs.filter((blog) => {
    if (categoryFilter && categoryFilter !== "All" && blog.category !== categoryFilter) {
        return false;
    }
    if (searchTerm && !blog.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
    }
    return true;
});

    return (

     <div className="">

{/* Filter by category */}
<div className="flex justify-around mt-8 ">

           <select
               className="px-3 py-2 border  select select-success w-full max-w-xs"
               value={categoryFilter}
               onChange={(e) => setCategoryFilter(e.target.value)}
           >
               <option value="All">All Categories</option>
               {/* Assuming categories are fetched from somewhere */}
               {/* Replace options with your actual category options */}
               <option value="Travel">Travel</option>
               <option value="Food">Food</option>
               <option value="Technology">Technology</option>
           </select>
    


        {/* Search by title */}
       
       <label className="input input-primary input-bordered flex items-center gap-2">
  <input type="text"
              
               placeholder="Search by title"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)} className="grow"  />
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
</label>
</div>
       <section className=" dark:bg-gray-900">
<div className="container px-6 py-10 mx-auto rounded-md">
   <div className="text-center">
       <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">From the blog</h1>
       <p className="max-w-lg mx-auto mt-4 text-gray-500">
           Salami mustard spice tea fridge authentic Chinese food dish salt tasty liquor. Sweet savory foodtruck pie.
       </p>
   </div>

   <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
       {
           filteredBlogs.map(blog=>(
               <div key={blog._id}>
           <div className="relative">
          
              

                  
                                   <img className="border-2 p-1 shadow-lg hover:border-violet-600 object-cover object-center w-full h-64 rounded-lg lg:h-80 border-1" src={blog.image || "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"} alt="" />

              
               <div className="border hover:border-sky-600 rounded-lg absolute bottom-0 flex p-3 bg-white dark:bg-gray-900 ">
               
                   <img className="border-2 hover:border-fuchsia-600 border-red-400 object-cover object-center w-10 h-10 rounded-full" src={blog.author.photo || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"} alt="" />
                   <div className="mx-4">
                       <h1 className="text-sm text-gray-700 dark:text-gray-200">{blog?.author?.name || "Siam Nahidul"}</h1>
                       <p className="text-sm text-gray-500 dark:text-gray-400">{blog?.author?.email || user?.email}</p>
                   </div>
               </div>
           </div>
           <h1 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">{blog?.title}</h1>
           <h1>{blog.posted_date}</h1>
           <hr className="w-32 my-6 text-blue-500" />
           <p className="text-sm text-gray-500 dark:text-gray-400">{blog?.short_description}</p>
           <a title={blog.long_description} href="#" className="inline-block mt-4 text-blue-500 underline hover:text-blue-400">Read more</a>
            <div className="flex items-center justify-between mt-6">
               
<Link 
to={`/blog/${blog._id}` }className="btn btn-secondary border-2 border-green-300 hover:bg-green-400" >View Details</Link>
<Link
onClick={()=>handleWish(blog._id)}
className="btn btn-primary border-2 border-green-300  hover:bg-yellow-500">Wishlist</Link>

</div>
       </div>
           ))
       }

       
       

       
   </div>
</div>
</section>


</div>

    );
};

export default AllPosts;
