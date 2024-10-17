import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import ProductCardMain from './ProductCardMain';

const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cat_id = searchParams.get('cat_id');
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const fetchProductsByCategory = async() => {
    setIsLoading(true);

    // const delay = 1000;
    // await new Promise(resolve => setTimeout(resolve, delay));

    const response = await axios.get(`http://localhost:3000/api/v1/products/category/${cat_id}`);
    setProducts(response.data.allProducts);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchProductsByCategory();
  }, []);
  if(isLoading){
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1 className='font-bold text-2xl'>Loading...</h1>
      </div>
    )
  }
  if(products.length == 0){
    return (
      <div className="w-screen h-[600px] flex justify-center items-center">
        <h1 className='font-bold text-2xl'>No Products Found!</h1>
      </div>
    )
  }
  return (
    <div className="w-screen h-fit">
        <div className='w-full h-full bg-green-100 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-16'>
        {products.map((product) => {
          return (
            <ProductCardMain key={product.id+product.seller} product={product}/>
          );
        })}
        </div>
    </div>
  )
}

export default Products