
import { Link, useLoaderData, useParams } from 'react-router-dom';

import { AuthContext } from '../provider/AuthProvider';
import { useContext, useEffect, useState} from "react";
import axios from 'axios';
import toast from 'react-hot-toast';

const BlogDetails = () => {
    const {user} = useContext(AuthContext)
    const { id } = useParams(); // blogId from the route
    const [comments, setComments] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const blog = useLoaderData()


    console.log(blog);
    const {_id,title,image,short_description,long_description,posted_date,category,author} = blog
    const authorEmail = author.email
    const isOwner = user && blog && user?.email === blog?.author?.email;
    console.log("Current User Email:", user?.email);
    console.log("Blog Author Email:", blog.author.email);
    console.log("Is Owner:", isOwner);

 
    const handleComment=async(e)=>{
e.preventDefault()
const form = e.target.form
const comment = e.target.comment.value
const blogid = _id
const username = user?.displayName
const posted_date = startDate.toLocaleDateString()
const profile = user?.photoURL
const authorName = author.name
const  authorEmail = author.email
const commentData = {
    comment,
    blogid,
    username,
    profile,
    authorName,
    posted_date,
    authorEmail
}


if (user?.email === authorEmail) {
  // Show alert indicating that the author cannot comment on their own blog
  toast.error("You cannot comment on your own blog.");
  return;
}
try{
const {data} = await axios.post('https://samblog-server.vercel.app/comment', commentData)
toast.success('Your Comment successfully added')
}catch (err){
console.log(err);
}
    }



    useEffect(() => {
      // Fetch comments for this blog
      axios.get(`https://samblog-server.vercel.app/comments/${id}`)
        .then(response => setComments(response.data))
        .catch(error => console.error("Error fetching comments:", error));
    }, [id]);




    
  return (
    <div className="mt-6 bg-gray-50">
      <div className="px-10 py-6 mx-auto">
        {/* author */}
        <div className="max-w-6xl px-10 py-6 mx-auto bg-gray-50">
          <a href="#_" className="block transition duration-200 ease-out transform hover:scale-110">
            <img className="object-cover w-full shadow-sm h-full" src={image || "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80"}  alt="" />
          </a>

          {/* post categories */}
         <div className='flex text-center justify-between'>
         <div className="flex items-center justify-start mt-4 mb-4">
       
       <a href="#" className="px-2 py-1 font-bold bg-red-400 text-white rounded-lg hover:bg-gray-500">{category}</a>
     </div>
     <div className='flex items-center justify-start mt-4 mb-4'>{isOwner && (
           <Link to={`/update/${blog._id}`}  className='btn border border-red-400 hover:bg-green-300' >
               Update Blog
           </Link>
       )}</div>
         </div>

          <div className="mt-2">
            {/* post heading */}
            <a href="#" className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-purple-500  hover:underline">{title}</a>

            {/* post views */}
            <div className="flex justify-start items-center mt-2">
              <p className="text-sm text-green-500 font-bold bg-gray-100 rounded-full py-2 px-2 hover:text-red-500">3000</p>
              <p className="text-sm text-gray-400 font-bold ml-5">Views</p>
            </div>

            {/* author avatar */}
            <div className="font-light text-gray-600">
              <a href="#" className="flex items-center mt-6 mb-6">
                <img  src={author.photo || "https://avatars.githubusercontent.com/u/71964085?v=4"}  alt="avatar" className="hidden border-2 border-orange-600 hover:border-violet-500 object-cover w-14 h-14 mx-4 rounded-full sm:block" />
           <div>
           <h1 className="font-bold text-gray-700 hover:underline">{author.name}</h1>
                <h1 className="font-bold text-gray-700 hover:underline">{posted_date}</h1>
               
           </div>
              </a>
            </div>
           <div className='text-right'>
          
           </div>
          </div>

     
          <div className="max-w-4xl px-10 mx-auto text-2xl text-gray-700 mt-4 rounded bg-gray-100">
            {/* content body */}
            <div>
              <p className="mt-2 p-8">{short_description}</p>
            </div>
            <br />
            <div>
              <p className="mt-2 p-8">{long_description}</p>
            </div>
          </div>

        </div>

        <h2 className="text-2xl mt-4 text-gray-500 font-bold text-center">Related Posts</h2>
        
        <div className=" grid h-full grid-cols-12 gap-10 pb-10 mt-8 sm:mt-16">
   
        </div>

    
        <div className="max-w-4xl py-16 xl:px-8 flex justify-center mx-auto">
          <div className="w-full mt-16 md:mt-0">
            <form 
            onSubmit={handleComment}
             className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7">
              <h3 className="mb-6 text-2xl font-medium text-center">Write a comment</h3>
              <textarea type="text"  name="comment" className="w-full px-4 py-3 mb-4  border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none" placeholder="Write your comment" rows="5" cols="33"></textarea>
              <input type="submit" value='Submit Comment'   className="text-white px-4 py-3 bg-blue-500 rounded-lg" />
            </form>
          </div>
        </div>

    
        <div className="max-w-4xl  py-16  bg-gray-100   min-w-screen animation-fade animation-delay  px-8 mx-auto sm:px-12 xl:px-5">
          <p className="mt-1 text-2xl font-bold text-left text-gray-800  sm:text-2xl md:text-3xl lg:text-4xl sm:text-center ">
            All comments on this post
          </p>
          {/* comments items */}
          {/* You can map through comments and render similar content here */}
          
		       
		        {/* <!--comment 1--> */}
		       {
            comments.map((comment)=>(
              <div key={comment.blogid} className="flex  items-center w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">

		        	<a href="#"><img src={comment.profile || "https://avatars.githubusercontent.com/u/71964085?v=4"}  alt={comment.username} className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"/>
			        </a>

		            <div><h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">By {comment.username}</h3>
                <p className="text-sm font-bold text-gray-300">{comment.posted_date}</p>
		            	<p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                  {comment.comment}</p>
		            </div>
		            
		        </div>
            ))
           }
		       
		 
		    

        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
