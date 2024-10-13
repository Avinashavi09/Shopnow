import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from "./Components/Shared/Layout/Layout";
import Products from "./Components/Pages/Products/Products";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import SignIn from "./Components/Pages/User/SignIn/SignIn";
import Orders from "./Components/Pages/Orders/Orders";
import Customers from "./Components/Pages/Customers/Customers";
import Reviews from "./Components/Pages/Reviews/Reviews";
import Transactions from "./Components/Pages/Transactions/Transactions";
import Settings from "./Components/Pages/Settings/Settings";
import HelpAndSupport from "./Components/Pages/HelpAndSupport/HelpAndSupport";
import Profile from "./Components/Pages/Profile/Profile";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const clientId = "465767371442-q8hhoa5nbgs4c26fdj8ukcts30r680d4.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={`${clientId}`}>
    <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="customers" element={<Customers />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="settings" element={<Settings />} />
                <Route path="support" element={<HelpAndSupport />} />
                <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/signin" element={<SignIn/>}/>
            {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
