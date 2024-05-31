import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {user,logout} = useContext(AuthContext)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const [theme, setTheme] = useState('light')

  useEffect(()=>{
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute('data-theme', localTheme);
  },[theme])
  
  
    const handleToggle = (e)=>{
  if(e.target.checked){
    setTheme('synthwave')
  }else{
    setTheme('light')
  }
    }

   
  return (
    <nav className="navbar-center relative bg-transparent dark:bg-gray-800 shadow-sm px-4 ">
      <div className=" px-6 py-4">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
          <Link to='/' className="text-4xl font-bold text-blue-500">
            SAMBlog Hub
            <span className="block text-lg text-green-500">Your Gateway to Innovative Insights</span>
          </Link>

            <div className="flex lg:hidden">
              <button onClick={toggleMenu} type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                {!isOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
            <NavLink
  to="/"
  className={({ isActive, isPending }) =>
    isActive
      ? " px-3 py-2 mx-3 mt-2 text-green-400 border-green-400 border-2 transition-colors hover:bg-green-200 duration-300 transform rounded-md lg:mt-0"
      : isPending
      ? "pending"
      : "px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md hover:border-2 lg:mt-0 dark:text-gray-200 hover:bg-green-200 hover:border-green-400 dark:hover:bg-gray-700"
  }
>
  Home
</NavLink>
{
  user ? <NavLink
  to="/addblog"
  className={({ isActive, isPending }) =>
    isActive
      ? "px-3 py-2 mx-3 mt-2 text-green-400 border-green-400 border-2 transition-colors hover:bg-green-200 duration-300 transform rounded-md lg:mt-0"
      : isPending
      ? "pending"
      : "px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md hover:border-2 lg:mt-0 dark:text-gray-200 hover:bg-green-200 hover:border-green-400 dark:hover:bg-gray-700"
  }
>
  Add Blog
</NavLink> : ""
}
<NavLink
  to="/allblogs"
  className={({ isActive, isPending }) =>
    isActive
      ? "px-3 py-2 mx-3 mt-2 text-green-400 border-green-400 border-2 transition-colors hover:bg-green-200 duration-300 transform rounded-md lg:mt-0"
      : isPending
      ? "pending"
      : "px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md hover:border-2 lg:mt-0 dark:text-gray-200 hover:bg-green-200 hover:border-green-400 dark:hover:bg-gray-700"
  }
>
  All Blogs
</NavLink>
<NavLink
  to="/top-posts"
  className={({ isActive, isPending }) =>
    isActive
      ? "px-3 py-2 mx-3 mt-2 text-green-400 border-green-400 border-2 transition-colors hover:bg-green-200 duration-300 transform rounded-md lg:mt-0"
      : isPending
      ? "pending"
      : "px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md hover:border-2 lg:mt-0 dark:text-gray-200 hover:bg-green-200 hover:border-green-400 dark:hover:bg-gray-700"
  }
>
  Featured Blogs
</NavLink>
{
  user ? <NavLink
  to="/wishlist"
  className={({ isActive, isPending }) =>
    isActive
      ? "px-3 py-2 mx-3 mt-2 text-green-400 border-green-400 border-2 transition-colors hover:bg-green-200 duration-300 transform rounded-md lg:mt-0"
      : isPending
      ? "pending"
      : "px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md hover:border-2 lg:mt-0 dark:text-gray-200 hover:bg-green-200 hover:border-green-400 dark:hover:bg-gray-700"
  }
>
  Wishlist
</NavLink> : ""
}
            </div>

            <div className="flex items-center mt-4 lg:mt-0">



            <label className="swap swap-rotate">
  
  {/* this hidden checkbox controls the state */}
  <input onChange={handleToggle} type="checkbox" className="theme-controller" 
  // value="synthwave" 
  />
  
  {/* sun icon */}
  <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
  
  {/* moon icon */}
  <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
  
</label>



{
    user ? 
    <div className="dropdown dropdown-center">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
      <img alt="Tailwind CSS Navbar component" src={user?.photoURL ||  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}     />
      </div>
    </div>
    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100  w-52">
      <li>
        <a className="justify-between">
        {user?.displayName || 'user name not found'}
        
        </a>
      </li>
 
      <li><a onClick={logout}>Logout</a></li>
    </ul>
  </div> 
  :
<NavLink to='/login' className="border-2 border-green-400 px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-green-300 dark:hover:bg-gray-700">Login</NavLink>
}
     
            </div>
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
