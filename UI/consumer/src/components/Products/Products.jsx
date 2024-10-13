import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cat_id = searchParams.get('cat_id');

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/products/cat/${cat_id}`)
      .then(response => response.json())
      .then(json => {setProducts(json)})
      .catch(error => console.error(error));
  }, []);
  return (
    <div className="w-screen h-fit">
        <div className='w-full h-full bg-green-100 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-4 pt-16'>
        {products.map((product) => {
          // console.log(product)
          return (
            <ProductCard key={product.id} product={product}/>
          );
        })}
        </div>
    </div>
  )
}

export default Products