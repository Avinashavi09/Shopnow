import { Carousel } from 'react-bootstrap';
import ExampleCarouselImage from '../Banners/ExampleCarouselmage';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/products/get/featured/`)
      .then(response => response.json())
      .then(json => setFeatured(json))
      .catch(error => console.error(error));
  }, []);
  return (
    <div className='w-screen h-fit'>
      <Carousel pause='hover'>
      {
        featured.map((feat)=>{
          return (
            <Carousel.Item key={feat._id} >
              <ExampleCarouselImage text="First slide" image={feat.image} name={feat.name} desc = {feat.richDescription}/>
              {/* <Carousel.Caption className='flex flex-col justify-between'>
                <h3 className='font-bold text-3xl text-zinc-200 font-serif shadow-inner saturate-150'>{feat.name}</h3>
                <p>{feat.richDescription}</p>
              </Carousel.Caption> */}
            </Carousel.Item>
          );
        })
      } 
      </Carousel>
    </div>
  )
}

export default Hero;