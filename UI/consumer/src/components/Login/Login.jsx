import React, { useEffect, useState } from 'react'
import LoginRegister from './LoginRegister';
import { useNavigate } from 'react-router-dom';

const Login = ({setIsLoggedIn}) => {
    const navigate = useNavigate();
    const [signIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState(0);
    const [userType, setUserType] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [street, setStreet] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    useEffect(()=>{
      if(userType === 'Admin'){
        setIsAdmin(true);
      }
      else{
        setIsAdmin(false);
      }
    }, [])
    const handleLogin = async (e) => {
        e.preventDefault();
    
        // Send a POST request to your backend for user authentication
        try {
          // console.log("EMAIL: "+ email);
          // console.log("Password: "+ password);
          const response = await fetch('http://localhost:3000/api/v1/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    
          if (response.ok) {
            // User is successfully logged in
            const data = await response.json();
            const token = data.token;
            const userId = data.userId;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userId', userId);
            // console.log(localStorage.getItem('jwtToken'));
            // console.log(localStorage.getItem('userId'));
            setIsLoggedIn(true); // Set the state to true
            console.log("Logged In!");
            navigate('/home');
          } else {
            // Handle authentication error, show a message to the user, etc.
            console.error('Authentication failed');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
    const handleSignUp = async (e) => {
      e.preventDefault();
      try{
        console.log("UserName: " + userName);
        console.log("Email: " + email);
        console.log("Password: " + password);
        console.log("User Type: " + userType);
        console.log("IsAdmin : " + isAdmin);
        console.log("Street : " + street);
        console.log("Apartment : " +  apartment);
        console.log("City : " + city);
        console.log("Zip : " + zip);
        console.log("Country : " + country);
        console.log("Phone : " + phone);
        const response = await fetch(`http://localhost:3000/api/v1/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: userName, email, password, phone, isAdmin, street, apartment, zip, city, country }),
        });
        if(response.ok){
          console.log("Account created successfully!");
        }
      }
      catch(err){
        console.error(err);
      }
    }
  return (
    // <div className='h-screen w-screen pt-16'>
    //   <h2>Login</h2>
    //   <form onSubmit={handleLogin}>
    //     {/* Input fields for email and password */}
    //     <input
    //       type="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="Email"
    //       required
    //     />
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //       required
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
    <LoginRegister handleLogin={handleLogin} handleSignUp={handleSignUp} setEmail={setEmail} setPassword={setPassword} setUserName={setUserName} setUserType={setUserType}
    setStreet={setStreet} setApartment={setApartment} setCity={setCity} setZip={setZip} setCountry={setCountry} setPhone={setPhone} setIsAdmin={setIsAdmin} setIsSignIn={setIsSignIn} signIn={signIn}
    />
  )
}

export default Login