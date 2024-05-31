
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";


const Main = () => {
    return (
        <div className=" overflow-hidden font-lato mx-auto container  justify-center">
           <div>
           <Navbar/>
           </div>
           <div className="min-h-[calc(100vh-246px)] w-auto">
            <Outlet/>
            </div>
            <div>
            <Footer/>
            </div>
        </div>
    );
};

export default Main;