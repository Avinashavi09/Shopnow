import { Carousel } from 'react-bootstrap';
import ExampleCarouselImage from '../Banners/ExampleCarouselmage';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/products/`)
      .then(response => response.json())
      .then(json => setFeatured(json))
      .catch(error => console.error(error));
  }, []);
  return (
    <div className='w-screen h-fit'>
      {/* <Carousel pause='hover'>
      {
        featured.map((feat)=>{
          return (
            <Carousel.Item key={feat._id} >
              <ExampleCarouselImage text="First slide" image={feat.image} name={feat.name} desc = {feat.richDescription}/>
            </Carousel.Item>
          );
        })
      } 
      </Carousel> */}
    </div>
  )
}

export default Hero;