import { useEffect, useState } from "react"
import axios from "axios";

const Messages = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Call the API to get all products for a seller
        const response = await axios.get(`http://localhost:3000/api/v1/products/670539d35d5a6adc594c83a7/sellers/670538ce5d5a6adc594c8396/reviews`);
        setReviews(response.data.reviews); // Assuming the API returns products under 'products'
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {
        reviews.map((review)=>{
         return (
          <h1 key={review.id}>
            {review.comment}
            {review.rating}
            {review.consumer}
            {review.createdAt}
          </h1>
         ) 
        })
      }
    </div>
  )
}

export default Messages