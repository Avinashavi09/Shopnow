import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import ProductCardMain from './ProductCardMain';

const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cat_id = searchParams.get('cat_id');

  const [products, setProducts] = useState([]);
  const fetchCategories = async() => {
    const response = await axios.get(`http://localhost:3000/api/v1/products/category/${cat_id}`);
    console.log(response.data.allProducts);
    setProducts(response.data.allProducts);
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="w-screen h-fit">
        <div className='w-full h-full bg-green-100 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-16'>
        {products.map((product) => {
          // console.log(product)
          return (
            // <ProductCard key={product.id} product={product}/>
            <ProductCardMain key={product.id} product={product}/>
          );
        })}
        </div>
    </div>
  )
}

export default Products