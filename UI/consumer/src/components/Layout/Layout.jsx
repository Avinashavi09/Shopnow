import { Outlet } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import Footer from "../Footer/Footer";
import { useContext } from "react";
import loginContext from "../Context/LoginContext";
import { ToastContainer } from 'react-toastify';


const Layout = () => {
  const {isLoggedIn,setIsLoggedIn} = useContext(loginContext);
  return (
    <div className='bg-body-tertiary min-h-screen h-fit'>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <ToastContainer />
        <section className="bg-white pt-16">
            <Outlet />
        </section>
        <Footer/>
    </div>
  )
}


export default Layout;