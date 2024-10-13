import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const sellerId = localStorage.getItem("sellerId");
  const fetchCustomers = async() => {
    const response = await axios.get(`http://localhost:3000/api/v1/sellers/${sellerId}/customers`);
    setCustomers(response.data.customers);
  }
  useEffect(()=>{
    fetchCustomers();
  },[])
  return (
    <div>
      <h1>Customers List</h1>
      { customers ?
        customers.map((customer)=>{
          return <p key={customer._id}>{customer.name} {customer._id} {customer.email}</p>
        })
        :
        <h1>Loading....</h1>
      }
    </div>
  )
}

export default CustomersList