import './App.css'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart';
import CartItem from './components/Cart/CartItem';
import TodayDeals from './components/TodaysDeals/TodayDeals';

import { useEffect, useState } from 'react';
import Products from './components/Products/Products';
import Login from './components/Login/login';
import UserProfile from './components/UserProfile/UserProfile';
import CartMain from './components/Cart/CartMain';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    const token = localStorage.getItem('jwtToken');
    // console.log("Token from APP: " + token);
    if(token){
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false); //TODO: Unnecessary!
    }
  }, []) // passing second argument as [] to stop the possibility of this running infinite times.

  return (
    <Router>
      <Routes>
        <Route element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          {/* <Route path='/cart' element={<Cart/>}/> */}
          <Route path='/cart' element={<CartMain/>}/>
          {/* <Route path='/cartItem' element={<CartItem/>}/> */}
          <Route path='/card' element={<TodayDeals/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/profile' element={<UserProfile/>}/>
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App