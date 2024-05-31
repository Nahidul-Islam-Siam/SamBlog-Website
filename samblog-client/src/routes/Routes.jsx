import { createBrowserRouter } from "react-router-dom";
import Main from "../Root/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../component/NotFound";
import AddBlog from "../pages/AddBlog";
import BlogDetails from "../component/BlogDetails";
import AllPosts from "../pages/AllPost";
import PrivateRoutes from "./PrivateRoutes";
import WishList from "../pages/WishList";
import Update from "../component/Update";
import Feature from "../pages/Feature";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement:<NotFound/>,
      children:[
        {
          path:'/',
          element:<Home/>,
loader:()=>fetch('https://samblog-server.vercel.app/blogs')
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/signup',
          element:<SignUp/>
        }
        ,
        {
          path:'/addblog',
          element:<AddBlog/>
        },
        {
          path:'/blog/:id',
          element:<PrivateRoutes><BlogDetails/></PrivateRoutes>,
          loader:({params})=>fetch(`https://samblog-server.vercel.app/blog/${params.id}`)
        },
      
        {
          path:'/addblog',
          element:<AddBlog/>
        },
        {
          path:'/allblogs',
          element:<AllPosts/>,
          loader:()=>fetch('https://samblog-server.vercel.app/blogs')
        }
        ,
        {
         path:'/wishlist',
         element:<PrivateRoutes> <WishList/></PrivateRoutes>

        },
        {
          path:'/update/:id',
          element: <PrivateRoutes><Update/></PrivateRoutes>,
          loader:({params})=>fetch(`https://samblog-server.vercel.app/blog/${params.id}`)
        },
        {
path:'/top-posts',
element:<Feature/>
        }
      ]
    },
  ]);
 export default router  