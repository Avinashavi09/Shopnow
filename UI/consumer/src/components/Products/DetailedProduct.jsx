import { useSearchParams } from "react-router-dom"
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductDetail = ({ product }) => {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([
    { id: 1, author: "John Doe", comment: "Great product!", rating: 5 },
    { id: 2, author: "Jane Smith", comment: "Worth the price.", rating: 4 },
  ]);
  const [productData, setProductData] = useState([]) ;
  const [searchParams, setSearchParams] = useSearchParams();
  const productId = searchParams.get("product_id");
  const sellerId =  searchParams.get("seller_id");

  const fetchProducts = async() => {
    console.log(productId+" " + sellerId)
    const response = await axios.get(`http://localhost:3000/api/v1/products/${productId}/sellers/${sellerId}/`)
    console.log(response.data.product);
    setProductData(response.data.product);
  }
  const fetchReviews = async() => {
    const response = await axios.get(`http://localhost:3000/api/v1/products/${productId}/sellers/${sellerId}/reviews`);
    setReviews(response.data.reviews);
    console.log(response.data.reviews)
  }
  const handleAddReview = async() => {
    //TODO: ADD FUNCTIONALITY;  
    const data = {
      "consumerId": "670927e574cb482fc0de4c7b",
      "rating": 5,
      "comment": "Testing Product!"
  }  
    await axios.post(`http://localhost:3000/api/v1/products/${productId}/sellers/${sellerId}/reviews`, data);
    fetchReviews();
  }
  const handleAddtoCart = async() => {
    // Add product to cart
    const cartData = {
        "consumerId": "670927e574cb482fc0de4c7b", //Make this consumerId dynamic;
        "productId": productId,
        "sellerId": sellerId,
        "quantity": 1
    }
    const response = await axios.post(`http://localhost:3000/api/v1/cart`, cartData);
}
  useEffect(()=>{
    fetchProducts();
    fetchReviews();
  },[])

  if(!productData && productData.seller){
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section: Product Image */}
        <img
          src={productData && productData.seller && productData.seller.images[0]}
          alt={productData ? productData.name : ''}
          className="w-full lg:w-1/2 h-80 object-cover rounded-lg shadow-md"
        />

        {/* Right Section: Product Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {productData ? productData.name : ''}
          </h1>
          <p className="text-2xl font-semibold text-gray-600 mb-4">
            {productData && productData.seller && productData.seller.price}
          </p>
          <p className="text-gray-700 mb-6">{ productData ? productData.description : 'description'}</p>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" onClick={handleAddtoCart}>
              Add to Cart
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Buy Now
            </button>
          </div>

          {/* Reviews Section */}
          <div className="border-t border-gray-300 pt-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-700">{review.author}</p>
                    <div className="text-yellow-500">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Add Review Section */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-700">Add a Review</h3>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:border-blue-500"
                rows="3"
                placeholder="Write your review here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <button
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleAddReview}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
