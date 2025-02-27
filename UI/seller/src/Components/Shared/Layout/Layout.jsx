import Header from "../Header/Header"
import SideBar from "../SideBar/SideBar"
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
      <SideBar/>
      <ToastContainer />
      <div className="flex flex-col flex-1">
        <Header/>
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout