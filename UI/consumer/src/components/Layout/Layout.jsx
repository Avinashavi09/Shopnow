import { Outlet } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import Footer from "../Footer/Footer";


const Layout = (props) => {
  return (
    <div className='bg-body-tertiary min-h-screen h-fit'>
        <NavBar isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn}/>
        <section className="bg-white pt-16">
            <Outlet />
        </section>
        <Footer/>
    </div>
  )
}


export default Layout;