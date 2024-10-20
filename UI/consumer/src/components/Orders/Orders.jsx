import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {
    const consumerId = localStorage.getItem("consumerId");
    const [orderHistory, setOrderHistory] = useState([]);
    const fetchOrders = async() => {
        const response = await axios.get(`http://localhost:3000/api/v1/consumers/${consumerId}/orders`);
        console.log(response.data.allOrders);
        setOrderHistory(response.data.allOrders);
    }
    useEffect(()=>{
        fetchOrders();
    },[])
    if(!orderHistory){
        return <h1>Loading...</h1>
    }
  return (
    <section className="py-0 pb-5 relative">
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">Order History</h2>

        <div className="flex sm:flex-col lg:flex-row sm:items-center justify-between">
            <ul className="flex max-sm:flex-col sm:items-center gap-x-14 gap-y-3">
                <li
                    className="font-medium text-lg leading-8 cursor-pointer text-indigo-600 transition-all duration-500 hover:text-indigo-600">
                    All Order</li>
                <li
                    className="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
                    Summary</li>
                <li
                    className="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
                    Completed</li>
                <li
                    className="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
                    Cancelled</li>
            </ul>
            <div className="flex max-sm:flex-col items-center justify-end gap-2 max-lg:mt-5">
                <div className="flex rounded-full py-3 px-4 border border-gray-300 relative">
                    <svg className="relative " width="18" height="20" viewBox="0 0 18 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.5 7.75H16.5M11.9213 11.875H11.928M11.9212 14.125H11.9279M9.14676 11.875H9.1535M9.14676 14.125H9.1535M6.37088 11.875H6.37762M6.37088 14.125H6.37762M5.25 4.75V1.75M12.75 4.75V1.75M7.5 18.25H10.5C13.3284 18.25 14.7426 18.25 15.6213 17.3713C16.5 16.4926 16.5 15.0784 16.5 12.25V9.25C16.5 6.42157 16.5 5.00736 15.6213 4.12868C14.7426 3.25 13.3284 3.25 10.5 3.25H7.5C4.67157 3.25 3.25736 3.25 2.37868 4.12868C1.5 5.00736 1.5 6.42157 1.5 9.25V12.25C1.5 15.0784 1.5 16.4926 2.37868 17.3713C3.25736 18.25 4.67157 18.25 7.5 18.25Z"
                            stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input type="text" name="from-dt" id="from-dt"
                        className="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900" placeholder="11-01-2023"/>
                </div>
                <p className="font-medium text-lg leading-8 text-black">To</p>
                <div className="flex rounded-full py-3 px-4 border border-gray-300 relative">
                    <svg className="relative " width="18" height="20" viewBox="0 0 18 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.5 7.75H16.5M11.9213 11.875H11.928M11.9212 14.125H11.9279M9.14676 11.875H9.1535M9.14676 14.125H9.1535M6.37088 11.875H6.37762M6.37088 14.125H6.37762M5.25 4.75V1.75M12.75 4.75V1.75M7.5 18.25H10.5C13.3284 18.25 14.7426 18.25 15.6213 17.3713C16.5 16.4926 16.5 15.0784 16.5 12.25V9.25C16.5 6.42157 16.5 5.00736 15.6213 4.12868C14.7426 3.25 13.3284 3.25 10.5 3.25H7.5C4.67157 3.25 3.25736 3.25 2.37868 4.12868C1.5 5.00736 1.5 6.42157 1.5 9.25V12.25C1.5 15.0784 1.5 16.4926 2.37868 17.3713C3.25736 18.25 4.67157 18.25 7.5 18.25Z"
                            stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input type="text" name="to-dt" id="to-dt"
                        className="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900" placeholder="11-01-2023"/>
                </div>
            </div>
        </div> */}
        <div className="mt-7 border border-gray-300 pt-9">
            <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                <div className="data">
                    <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">Order : #10234987</p>
                    <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">Order Payment : 18th
                        march 2021</p>
                </div>
                <div className="flex items-center gap-3 max-md:mt-5">
                    <button
                        className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">Show
                        Invoice</button>
                    <button
                        className="rounded-full px-7 py-3 bg-indigo-600 shadow-sm shadow-transparent text-white font-semibold text-sm transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700">Buy
                        Now</button>

                </div>
            </div>
            {
                orderHistory.map((order)=>{
                    return (
                        <div key={order._id}>
                        <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2"
                            fill="none">
                            <path d="M0 1H1216" stroke="#D1D5DB" />
                        </svg>

                        <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                            <div className="grid grid-cols-4 w-full">
                                <div className="col-span-4 sm:col-span-1">
                                    <img src="https://pagedone.io/asset/uploads/1705474774.png" alt="" className="max-sm:mx-auto object-cover"/>
                                </div>
                                <div
                                    className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                                    <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">
                                        {order.product ? order.product.name : 'product name'}</h6>
                                    <p className="font-normal text-lg leading-8 text-gray-500 mb-8 whitespace-nowrap">By: {order.seller.name}</p>
                                    <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                                        {/* <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Size: s</span> */}
                                        <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Qty: {order.quantity}</span>
                                        <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">Price ₹{order.totalPrice}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
                                <div className="flex flex-col justify-center items-start max-sm:items-center">
                                    <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                                        Status</p>
                                    <p className={`font-semibold text-lg leading-8 text-left whitespace-nowrap ${order.status === "Pending" ? 'text-yellow-500' : ''} ${order.status === "Shipped" ? 'text-amber-800' : ''} ${order.status === "Cancelled" ? 'text-red-500' : ''} ${order.status === "Delivered" ? 'text-green-500' : ''}`}> {order.status} </p>
                                </div>
                                <div className="flex flex-col justify-center items-start max-sm:items-center">
                                    <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                                        Ordered Date</p>
                                    <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">23rd March
                                        2021</p>
                                </div>
                            </div>

                        </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
</section>
                                        
                                        
  )
}

export default Orders