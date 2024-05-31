import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../assets/ban.json'
import Lottie from 'react-lottie';
const Banner = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: banner,
		rendererSettings: {
		  preserveAspectRatio: "xMidYMid slice"
		}
	  };
	
    return (
		<section className="dark:bg-gray-100 dark:text-gray-800">
		<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
			<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
				
			<Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      />
			</div>
			<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
				<h1 className="text-5xl font-bold leading-none sm:text-6xl text-center">
					<span className="text-violet-600">Welcome to Your Blog Haven <br /></span>
				</h1>
				<h2 className='text-center mt-3'>Share Your Stories, Inspire Others</h2>
				<p className="mt-6 mb-8 text-lg sm:mb-12 text-center">Join our community of passionate writers. Share your unique voice and discover diverse perspectives. <br /> Start your blogging journey today.
					
				</p>
				<div className="flex flex-col  sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4  text-center items-center lg:justify-center">
					<Link to='/addblog'   className="btn border-2 border-pink-500 hover:border-blue-700 rounded-full text-lg font-semibold  hover:bg-violet-600 dark:text-gray-50">Add Blog</Link>
					<Link   className="btn border-2 border-pink-500 hover:border-blue-700 rounded-full text-lg font-semibold  hover:bg-emerald-500 dark:text-gray-50">Feature Blog</Link>
				</div>
			</div>
		</div>
	</section>
    );
};

export default Banner;