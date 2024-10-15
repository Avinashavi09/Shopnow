import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import ProductCardMain from './ProductCardMain';
import {Link} from "react-router-dom";

const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cat_id = searchParams.get('cat_id');

  const [products, setProducts] = useState([]);
  const fetchCategories = async() => {
    const response = await axios.get(`http://localhost:3000/api/v1/products/category/${cat_id}`);
    // console.log(response.data.allProducts);
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
            <Link key={product.id+product.seller} as={Link} to={`/product-detail?product_id=${product.id}&seller_id=${"670538ce5d5a6adc594c8396"}`}> {/*TODO: MAKE SELLER ID DYNAMIC*/}
              <ProductCardMain key={product.id} product={product}/>
            </Link>
          );
        })}
        </div>
    </div>
  )
}

export default Products