import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLink from "../component/SocialLink";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import log from '../assets/login.json'
import Lottie from "react-lottie";
function Login() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: log,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    const {loginUser} = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state || '/'
  
    // console.log(result.user)
// const {data} = await axios.post(`https://samblog-server.vercel.app/jwt`,{
//     email:result?.user?.email
// },
// {withCredentials:true}
// )
// console.log(data)
  const handleLogin = async e =>{
    e.preventDefault()
   
    const email = e.target.email.value
    const password = e.target.password.value
   const use = {email,password}
    console.log(use);
 try{
    const result = await loginUser(email,password)
        console.log(result.user)
const {data} = await axios.post(`https://samblog-server.vercel.app/jwt`,{
    email:result?.user?.email
},
{withCredentials:true}
)
console.log(data)
    navigate(from, {replace:true})
    toast.success('Signin Successfl')
 }catch(err){
    console.log(err)
    toast.error(err?.message)
 }
}
    return (

        <div className="">
       
        <div className="card lg:card-side bg-base-100 shadow-xl justify-between">
  <figure>  <Lottie 
	    options={defaultOptions}
        height={400}
        width={500}
      /></figure>
  <div className="card-body">
  <div className=" items-center justify-center">
                <div className="flex justify-center mx-auto">
                
                </div>

                <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                    Welcome back!
                </p>



              

<div className="text-center justify-center items-center">
<SocialLink/>

</div>


                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                    <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login with email</a>

                    <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                </div>

              <form onSubmit={handleLogin}>
              <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Email Address</label>
                    <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email"  name="email"/>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between">
                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Password</label>
                        <a href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget Password?</a>
                    </div>

                    <input id="loggingPassword" name="password" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
                </div>

                <div className="mt-6">
                    <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                        Sign In
                    </button>
                </div>
              </form>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                    <Link to='/signup' className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</Link>

                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>
            </div>
  </div>
</div>
        </div>
    );
}

export default Login;
