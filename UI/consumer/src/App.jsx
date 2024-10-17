import './App.css'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import TodayDeals from './components/TodaysDeals/TodayDeals';

import Products from './components/Products/Products';
import Login from './components/Login/login';
import UserProfile from './components/UserProfile/UserProfile';
import CartMain from './components/Cart/CartMain';
import DetailedProduct from './components/Products/DetailedProduct';
import LoginMain from './components/Login/LoginMain';
import RegisterMain from './components/Login/RegisterMain';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LoginContextProvider } from './components/Context/LoginContext';
import Orders from './components/Orders/Orders';
import Settings from './components/Settings/Settings';

function App() {
  const clientId = "465767371442-q8hhoa5nbgs4c26fdj8ukcts30r680d4.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={`${clientId}`}>
      <LoginContextProvider>
        <Router>
          <Routes>
            <Route element={<Layout/>}>
              <Route path='/' element={<Home/>}/>
              <Route path='/home' element={<Home/>}/>
              {/* <Route path='/cart' element={<Cart/>}/> */}
              <Route path='/cart' element={<CartMain/>}/>
              {/* <Route path='/cartItem' element={<CartItem/>}/> */}
              <Route path='/card' element={<TodayDeals/>}/>
              <Route path='/products' element={<Products/>}/>
              <Route path='/product-detail' element={<DetailedProduct/>}/>
              {/* <Route path='/profile' element={<UserProfile/>}/> */}
              <Route path='/profile' element={<Settings/>}/>
              <Route path='/orders' element={<Orders/>}/>
              {/* <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/> */}
            </Route>
            <Route path='/login' element={<LoginMain/>}/>
            <Route path='/register' element={<RegisterMain/>}/>
          </Routes>
        </Router>
      </LoginContextProvider>
    </GoogleOAuthProvider>
  )
}

export default App