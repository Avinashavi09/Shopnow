import { useState } from "react";
import { useNavigate } from "react-router-dom";


const CartItem = (props) => {
    const navigate = useNavigate();
    const [count, setCount] = useState(props.item.quantity);
    const [price, setPrice] = useState(props.item.product.price*props.item.quantity);
    const token = localStorage.getItem('jwtToken');
    const userId = localStorage.getItem('userId');
    const productId = props.item.product._id;
    // console.log(productId);
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    const increase = async () =>{
        try{
            // console.log(props.item.product._id);
            const response = await fetch(`http://localhost:3000/api/v1/carts/increase/${userId}/${props.item.product._id}`,{
                method: 'POST',
                headers: headers
            });
            if(response.status === 401){
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('userId');
                navigate('/home');
                //TODO: Redirect to Home-Page;
            }
            else{
                setCount(count+1);
                setPrice(price + props.item.product.price);
                props.setTP(props.tP + props.item.product.price);
            }
            
        }
        catch(err){
            console.error(err)
        }
    }
    const decrease = async () =>{
        try{
            // console.log(props.item.product._id);
            const response = await fetch(`http://localhost:3000/api/v1/carts/decrease/${userId}/${props.item.product._id}`,{
                method: 'POST',
                headers: headers
            });
            if(response.status === 401){
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('userId');
                //TODO: Redirect to Home-Page;
            }
            props.setTP(count>1 ? props.tP - props.item.product.price : props.tP);
            setCount(count > 1 ? count-1 : count);
            setPrice(price - props.item.product.price > 0 ? price - props.item.product.price : price)
        }
        catch(err){
            console.error(err)
        }
    }
    const deleteItem = async() =>{
        try{
            const response = await fetch(`http://localhost:3000/api/v1/carts/${userId}/${productId}`, {
                method: 'DELETE',
                headers
            });
            if(response.ok){
                window.location.reload();
            }
        }
        catch(err){
            console.error(err);
        }
    }
  return (
    <div className="w-full mb-3">
        <div className="flex w-full border-2">
            <div className="flex-[2_2_0%] flex justify-center">
                <img alt="IMG" src={props.item.product.image}></img>
            </div>
            <div className="flex-[9_9_0%] bg-red-300 flex flex-col pb-3 pt-3 w-full pl-5 justify-center">
                <h1 className="font-bold text-2xl font-serif">{props.item.product.name}</h1>
                <p className="mb-2 font-light">{props.item.product.description}</p>
                <h1 className="text-base">PRICE: <span className="ml-4">{price}</span></h1>
                <div className="flex m-auto justify-content w-full">
                    <div className="flex-1">
                        <button className="text-xl">Save to later</button>
                    </div>
                    <div className="flex-1"><button className="text-xl hover:text-red-700" onClick={deleteItem}>Remove</button></div>
                </div>
                <div className="flex items-center">
                    <button onClick={decrease}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
                    </button>
                    <h1 className="pl-2 pr-2 text-lg">COUNT: <span className="font-bold">{count}</span></h1>
                    <button onClick={increase}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CartItem;
