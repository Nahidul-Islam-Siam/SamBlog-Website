
import { useLoaderData } from "react-router-dom";
import TabCategry from "../component/TabCategry";
import NewsletterSignup from "../component/NewsletterSignup";

import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Teams from "../component/Teams";
import Contact from "../component/Contact";
import Owner from "../component/Owner";
import Banner from "../component/Banner";
import FeatureBlogs from "../component/FeatureBlogs";



const Home = () => {

    const blogs = useLoaderData()
    console.log(blogs);
    const {loading} = useContext(AuthContext)
    // if(loading){
    //     return <div className="flex items-center justify-center space-x-2">
    //     <div className="w-4 h-4 rounded-full animate-pulse bg-violet-600"></div>
    //     <div className="w-4 h-4 rounded-full animate-pulse bg-violet-600"></div>
    //     <div className="w-4 h-4 rounded-full animate-pulse bg-violet-600"></div>
    // </div>
    // }
    return (
     
        <div className="shared-background">
       
      
            <Banner>

                
            </Banner>
      
            <FeatureBlogs/>
           <TabCategry blogs={blogs}/>
         <Teams/>
         <Contact/>
         <Owner/>
           <NewsletterSignup/>

        </div>
    );
};

export default Home;