/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";


const FeatureBlogs = () => {
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
    return (
        <div>
           <section className="py-6 sm:py-12 dark:bg-gray-100 dark:text-gray-800">
	<div className="container p-6 mx-auto space-y-8">
		<div className="space-y-2 text-center">
			<h2 className="text-3xl font-bold">Feature Blogs</h2>
			<p className="font-serif text-sm dark:text-gray-600">Read our Current best Trending Blogs of the Last Month</p>
		</div>
		<Marquee>
         <div className="flex grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-2">
		{
			topPosts.map(post=>(
				<article key={post._id} className="flex flex-col dark:bg-gray-50">
				<a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
    <img alt="" className="border-2 border-cyan-600 shadow hover:border-fuchsia-600 object-cover w-full h-52 dark:bg-gray-500 img-parallelogram" src={post.image} />
</a>
				<div className="flex flex-col flex-1 p-6">
					<a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum"></a>
					<a rel="noopener noreferrer" href="#" className="text-red-400 text-xs tracking-wider uppercase hover:underline dark:text-violet-600">{post.category}</a>
					<h3 className="flex-1 py-2 text-lg font-semibold leading-snug">{post.title}</h3>
					<div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
						<span>{post.posted_date}</span>
						<span>{post.title.length}K views</span>
					</div>
				</div>
			</article>
			))
		}
			
		
		</div>

        </Marquee>
	</div>
</section> 
        </div>
    );
};

export default FeatureBlogs;