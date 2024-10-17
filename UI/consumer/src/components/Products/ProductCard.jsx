import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ProductCard = (props) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('jwtToken');
  const [isPresent, setIsPresent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  if(token){
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    useEffect(()=>{
      async function fetchData(){
        try{
          const response = await fetch(`http://localhost:3000/api/v1/carts/${userId}`, {
            method: 'GET',
            headers
          });
          // console.log(response)
          if(response.ok){
            const data = await response.json();
            // console.log(data)
            let isProductPresent;
            if(data.cartItems){
              // Check if the product exists in the order items
              isProductPresent = data.cartItems.some((item) => item.product._id === props.product._id);
            }
            // console.log(isProductPresent);
            setIsPresent(isProductPresent);
          }
        }
        catch(err){
          console.error(err)
        }
      }
      fetchData();
    }, []);
  }
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const cartItems=[
    {
      quantity: 1,
      product: props.product._id
    }
  ];
  const reqBody = {
    cartItems,
    user: userId
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  };
  const addToCart = async() => {
    if(isLoading){
      return;
    }
    setIsLoading(true)
    const apiUrl = `http://localhost:3000/api/v1/carts/`;
    fetch(apiUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data
      setIsPresent(true)
      // console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error('There was a problem with the fetch operation:', error);
    });
    setIsLoading(false)

  };
  const navigate = useNavigate();
  const goToCart = () => {
    navigate('/cart');
  }
  return (
    <div className="p-4 w-96">
      <div className="border rounded-lg p-4">
        <img
          src={props.product.image}
          alt={props.product.name}
          className="w-full h-32 object-cover rounded"
        />
        <h3 className="text-lg font-semibold mt-2">{props.product.name}</h3>
        <p className="text-gray-600">{props.product.description}</p>
        <div className="mt-2">
          <span className="text-blue-500">₹{props.product.price}</span>
        </div>
        {
          !isPresent ? (
            <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-full hover:bg-blue-600 cursor-pointer" onClick={ isLoading ? () => {} : addToCart}>
              Add to Cart
            </button>
          ) : (
            <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-full hover:bg-blue-600 hover:cursor-pointer" onClick={goToCart}>
              Go to Cart
            </button>
          )
        }
      </div>
    </div>
  )
}

export default ProductCard