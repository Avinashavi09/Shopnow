import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import CartPrice from "./CartPrice"
import { useState, useEffect } from 'react';

//fetch(`http://localhost:3000/api/v1/carts/650a93b6fb997e14e598204e` 

// const cart = [
//     { id: 1, title: 'Product 1', description: 'Description 1', price: 10000 },
//     { id: 1, title: 'Product 1', description: 'Description 1', price: 10000 },
//     { id: 1, title: 'Product 1', description: 'Description 1', price: 10000 },
//     { id: 1, title: 'Product 1', description: 'Description 1', price: 10000 },
//     { id: 1, title: 'Product 1', description: 'Description 1', price: 10000 },
//     { id: 1, title: 'Product 1', description: 'Description 1', price: 10000 },
//     { id: 1, title: 'Product 1', description: 'Description 1', price: 10000 },
//     { id: 1, title: 'Product 1', description: 'Description 1', price: 10000 },
//     { id: 1, title: 'Product 1', description: 'Description 1', price: 10000 },
//     { id: 1, title: 'Product 1', description: 'Description 1', price: 10000 },
//     { id: 1, title: 'Product 1', description: 'Description 1', price: 10000 },
//     { id: 1, title: 'Product 1', description: 'Description 1', price: 10000 },
//     { id: 1, title: 'Product 1', description: 'Description 1', price: 10000 },
//     { id: 1, title: 'Product 1', description: 'Description 1', price: 10000 },
//     { id: 1, title: 'Product 1', description: 'Description 1', price: 10000 },
//   ];
const Cart = () => {
    const navigate = useNavigate();
    const [cart, setcart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const token = localStorage.getItem('jwtToken');
    const userId = localStorage.getItem('userId');
    if(token){
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
          
        useEffect(() => {
            fetch(`http://localhost:3000/api/v1/carts/${userId}` ,{
                method: 'GET',
                headers
            })
            .then(response => response.json())
            .then(json => {setcart(json); setTotalPrice(json.totalPrice)})
            .catch(error => console.error(error));
        }, []);
    }
    else{
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId');
        // window.location.reload();
        // navigate('/login');
    }
    useEffect(()=>{
        if(!token){
            navigate('/login');
        }
    })
    // console.log(cart);
    if(!cart && cart.cartItems === null){
        return <div className="pt-16">Loading..</div>
    }
  return (
    <div className="min-h-screen h-fit w-screen bg-slate-100">
        <div className={`h-full min-h-screen w-4/5 p-1 sm:w-full md:w-4/5 lg:w-4/5 sm:p-1 flex m-auto ${window.innerWidth <= 1000?'w-full':''}`}>
            <div className={`h-full min-h-screen flex-[2_2_0%] pt-16 ${window.innerWidth<=640?'pt-24':''}`}>
                {
                    cart.cartItems && cart.cartItems.map((item)=>{
                        return(
                            <CartItem key={item._id} item={item} tP={totalPrice} setTP = {setTotalPrice}/>
                        )
                    })
                }
            </div>
            <div className="h-fit flex-[1_1_0%] ml-2 pt-16 min-w-fit">
                <div className={`${window.innerWidth<=800?'':'fixed'} h-fit`}>
                    <CartPrice tP={totalPrice} setTP = {setTotalPrice}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart