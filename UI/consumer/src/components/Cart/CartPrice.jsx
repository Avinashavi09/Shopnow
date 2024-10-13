import { useEffect, useState } from "react";



const CartPrice = (props) => {
  const [cart, setcart] = useState(null);
  const [price, setPrice] = useState(0);
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
            .then(json => {setcart(json); setPrice(json.totalPrice)})
            .catch(error => console.error(error));
        }, []);
    }
    else{
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId');
        window.location.reload();
        navigate('/login');
    }
  return (
    <div className='w-full min-h-screen'>
        <div className='min-h-screen pl-1 flex flex-col w-full'>
            <div>
              <h1 className="font-bold flex justify-center text-2xl">PRICE DETAILS</h1>
              <hr className="p-1 border-black"></hr>
            </div>
            <div className="flex-[1_1_0%] flex h-full bg-slate-300">
              <div className=" w-32 sm:w-32 md:w-40 flex-1 flex flex-col">
                <h1 className="text-xl mt-4 p-3">PRICE: </h1>
                <h1 className="text-xl mt-2 p-3">DISCOUNT: </h1>
                <h1 className="text-xl mt-2 p-3">DELIVERY: </h1>
                <hr className="p-1 mt-6 border-black"/>
                <h1 className="text-2xl p-3 h-32 flex items-center">TOTAL AMOUNT: </h1>
              </div>
              <div className="w-32 sm:w-32 flex-1">
                <h1 className="text-xl mt-4 p-3">₹ {props.tP}</h1>
                <h1 className="text-xl mt-2 p-3">₹ -0</h1>
                <h1 className="text-xl mt-2 p-3">₹ 0</h1>
                <hr className="p-1 mt-6 border-black"/>
                <h1 className="text-2xl p-3 h-32 flex items-center">₹ {props.tP}</h1>
              </div>

                {/* <div className='flex flex-[1_1_0%] items-center w-full'>
                  <div className="flex flex-1 pl-16 h-full text-3xl">PRICE DETAILS</div>
                </div>  
                <hr className="w-full"/>
                <div className='flex flex-[2_2_0%] items-center w-full'>
                  <div className="flex flex-1 pl-16 h-full">
                    <div className="flex-[2_2_0%] font-bold text-2xl h-full">PRICE: </div>
                    <div className="flex-[10_10_0%] font-bold text-2xl">₹{props.tP}</div>
                  </div>
                </div>
                <div className='flex-[2_2_0%] flex items-center'>
                   <div className="flex flex-1 pl-16 h-full">
                    <div className="flex-[2_2_0%] font-bold text-2xl h-full">TOTAL DISCOUNT: </div>
                    <div className="flex-[10_10_0%] font-bold text-2xl">₹0</div>
                   </div>
                </div>
                <div className='flex-[2_2_0%] flex items-center'>
                    <div className="flex flex-1 pl-16 h-full">
                      <div className="flex-[2_2_0%] font-bold text-2xl h-full">DELIVERY CHARGES: </div>
                      <div className="flex-[10_10_0%] font-bold text-2xl">₹0</div>
                    </div>
                </div>
                <div className=' flex-[2_2_0%] flex items-center border-1 border-black'>
                    <div className="flex flex-1 pl-16 h-full">
                      <div className="flex-[2_2_0%] font-bold text-2xl h-full">TOTAL AMOUNT: </div>
                      <div className="flex-[10_10_0%] font-bold text-2xl">{props.tP}</div>
                    </div>
                </div> */}
            </div>
            <div className="flex-[10_10_0%]">
              <div className="flex justify-center mt-10">
                <button className="p-2 border-2 border-black bg-blue-500 rounded-3xl text-xl">Buy Now!</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default CartPrice