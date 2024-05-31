

import  { useContext, useEffect,  useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
// import { AuthContext } from "../provider/AuthProvider";
const Feature = () => {
  const [topPosts, setTopPosts] = useState([]);
const {user} =useContext(AuthContext)
  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
       
        const response = await axios.get("https://samblog-server.vercel.app/blogs");
        const posts = response.data;

      
        const postsWithWordCount = posts.map((post) => ({
          ...post,
          wordCount: post.long_description.split(" ").length,
        }));

      
        postsWithWordCount.sort((a, b) => b.wordCount - a.wordCount);

        
        const topPosts = postsWithWordCount.slice(0, 10);

        setTopPosts(topPosts);
      } catch (error) {
        console.error("Error fetching top posts:", error);
      }
    };

    fetchTopPosts();
  }, []);

 
  //
  // tenstack table work

//   const data = useMemo(() => mData, []);

  /**  @type import('@tanstack/react-table').columnDef<any>*/
//   const columns = [
//     {
//       header: "ID",
//       accessorKey: "id",
//       footer: "ID",
//     },
//     {
//       header: "Blog Title",
//       accessorKey: "title",
//       footer: "ID",
//     },
//     {
//         header: "Blog Owner",
//         accessorKey: "author_name",
//         footer: "ID",
//       },
//       {
//         header: "Blog owner Profile Picture",
//         accessorKey: "author_photo",
//         footer: "ID",
//       },
//       {
//         header: "Category",
//         accessorKey: "id",
//         footer: "ID",
//       },
//       {
//         header: "Posted Date",
//         accessorKey: "id",
//         footer: "ID",
//       },
//   ];

//   const table = useReactTable({ data, columns });

  return (
    <div>
      <h2>Top Posts</h2>
      <ul>
        {/* {topPosts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.short_description}</p>
            <p>Word Count: {post.wordCount}</p>
          </li>
        ))} */}
      </ul>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
       No.
        </th>
        <th>Blog Owner</th>
        <th>Blog Title</th>
        <th>Category</th>
        <th>Posted Date</th>
      </tr>
    </thead>
    {/* //  Each table of row will include Serial Number, Blog Title, Blog Owner, and Blog owner Profile Picture */}
  {
    topPosts.map((post,index)=>(
        <tbody key={post._id}>
        {/* row 1 */}
        <tr>
          <td>
            {index+1}
          </td>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={post?.author.photo || "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" || user?.photoURL ||  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold">{post?.author.name || user?.name}</div>
         
              </div>
            </div>
          </td>
          <td>
           {post.title}
            <br/>
           
          </td>
          <td>{post.category}</td>
          <th>
            <button className="btn btn-ghost btn-xs">{post?.posted_date }</button>
          </th>
        </tr>
       
       
      </tbody>
    ))
  }
    {/* foot */}
   
    
  </table>
</div>
    </div>
  );
};

export default Feature;
