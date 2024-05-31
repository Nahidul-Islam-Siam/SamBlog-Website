import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLink from "../component/SocialLink";
import { AuthContext } from "../provider/AuthProvider";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";


function SignUp() {

    const {createUser} = useContext(AuthContext)

    const [error,setError] = useState('')


    // navigation system
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state || '/'
    
    
    const handleRegister =async e =>{
        e.preventDefault()
        const name = e.target.name.value
       
        const email = e.target.email.value
        const password = e.target.password .value
        const confirmPassword  = e.target.password.value
        

if (password !== confirmPassword) {
    setError('Passwords did not match')
   
    return
}
if (/(?=.*[a-z])/
.test(password)) {
    setError("Must have an Lowercase letter in the password") 
    toast.error("Must have an Lowercase letter in the password")
    return
}
if ( /(?=.*[A-Z])/.test(password)
) {
   setError("Must have an Uppercase letter in the password") 
   return
}
if(password.length<6)
{
setError ('Password must be six characters')
}

setError('')
       try{
const result = await createUser(email,password)
    console.log(result.user)
const {data} = await axios.post(`https://samblog-server.vercel.app/jwt`,{
    email:result?.user?.email
},
{withCredentials:true}
)
console.log(data)
navigate(from,{replace:true})
toast.success('Signup Successfully')
       }catch(err){
console.error(err?.message)
toast.error(err?.message)
       }
    }
    return (
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
            <div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')"}}></div>

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <div className="flex justify-center mx-auto">
                    <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                </div>

                <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                    Create an Account
                </p>
<form onSubmit={handleRegister}>
    
<div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="registrationUsername">Username</label>
                    <input id="registrationUsername" name="name" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" />
                </div>

                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="registrationEmail">Email Address</label>
                    <input id="registrationEmail" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" name="email" type="email" />
                </div>

                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="registrationPassword">Confirm Password</label>
                    <input id="registrationPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" name="password" type="text" />
                </div>
                {
                    error ? <small>{error}</small> : ''
                }

                <div className="mt-6">
                    <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                        Register
                    </button>
                </div>
</form>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                    <Link to='/login' className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">Already have an account? Sign in</Link>

                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>

                <div className="flex justify-center mt-4">
                   <SocialLink/>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
