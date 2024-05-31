/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import DatePicker from "react-datepicker";
import { useLoaderData } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Update = () => {
   
    const blog = useLoaderData()
    const {_id,title,image,short_description,long_description,posted_date,category,author} = blog || {}

console.log(posted_date);

    const {user} = useContext(AuthContext)
   
    const [startDate, setStartDate] = useState(new Date(posted_date) || new Date() );
    const handleFormSubmit = async (e) =>{
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const email = form.email.value
        const image = form.image.value
        const posted_date = startDate.toLocaleDateString()
        const category = form.category.value
        const short_description = form.shortDescription.value
        const long_description = form.longDescription.value
        
        const blogData ={
            title,
        posted_date,
        image,
        category,
        short_description,
        long_description,
        
        author:{
            email,
            name: user?.displayName,
            photo: user?.photoURL,
        },
        }
        try{
        const {data} = await axios.put(`https://samblog-server.vercel.app//blog/${_id}`, blogData)
        console.log(data);
        toast.success('Your blog post Updated succesfully ')
        }
        catch(err){ 
        console.log(err);
        toast.error(err)
        }
            }
    return (
        <div>
        <div className="container hero-overlay mx-auto px-6">
            <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center lg:items-stretch bg-cover bg-center text-gray-800" style={{backgroundImage: "url('https://i.ibb.co/CQBsRS8/pexels-stywo-1261728.jpg')"}}>
                <div className="lg:w-1/2 p-8">
                    <header className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white">Update Blog</h1>
                        <p className="mt-2">Share your thoughts and ideas with the world!</p>
                    </header>
                  <div className="card shrink-0 w-full justify-between  shadow-2xl bg-base-100">
                  <form 
                    onSubmit = {handleFormSubmit}
                     className="card-body w-full  bg-opacity-90 bg-base-300  rounded-lg shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="title"  className="label">Blog Title</label>
                                
                                <input type="text" id="title" defaultValue={title} name="title" placeholder="Blog Title" className="input input-bordered input-success w-full max-w-xs" />
                            </div>
                            <div>
                                <label htmlFor="image" className="label">Image URL</label>
                               
                                <input defaultValue={image} type="text" name="image"  id="image"  placeholder="Image URL" className="input input-bordered input-success w-full max-w-xs" />
                            </div>
                            <div>
                                <label htmlFor="category" className="label">Category</label>
                                <select id="category" name="category" defaultValue={category} className="select  select-success w-full max-w-xs">
                                    <option disabled selected>Select Category</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Food">Food</option>
                                    <option value="Health and Wellness">Health and Wellness</option>
                                    <option value="Career and Personal Development">Career and Personal Development</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                    {/* Add more categories as needed */}
                                </select>
                                
                            </div>
                            <div>
                                <label htmlFor="date" className="label">Posted Date</label>
                                <DatePicker className="input input-bordered input-success w-full max-w-xs" selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            <div>
                                <label htmlFor="email" className="label">Email</label>
                                <input id="email" type="email" placeholder="Author Email" defaultValue={user?.email} className=" input input-bordered input-success w-full max-w-xs" />
                            </div>
                            
                            <div className="col-span-2">
                                <label htmlFor="shortDescription" className="label">Short Description</label>
                                <textarea id="shortDescription" name="shortDescription" placeholder="Short Description" className="w-full rounded-md textarea-success  textarea-bordered textarea-md textarea border-gray-300 focus:ring focus:ring-opacity-75 focus:ring-violet-600 dark:border-gray-300"></textarea>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="longDescription" className="label">Long Description</label>
                                <textarea id="longDescription" name="longDescription" placeholder="Long Description" className="w-full textarea-success textarea-bordered textarea-lg textarea rounded-md border-gray-300 focus:ring focus:ring-opacity-75 focus:ring-violet-600 dark:border-gray-300"></textarea>
                            
                            </div>
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
                        </div>
                    </form>
                  </div>
                </div>
            </section>
        </div>
        
        
        
        
                </div>
    );
};

export default Update;