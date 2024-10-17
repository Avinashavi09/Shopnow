import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";
import CategoryCard from "../Categories/CategoryCard";
import ItemCard from "./ItemCard";

import { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

// const categories = [
//   { id: 1, title: "Category 1", description: "Description 1" },
//   { id: 2, title: "Category 2", description: "Description 2" },
//   { id: 3, title: "Category 3", description: "Description 3" },
//   { id: 4, title: "Category 4", description: "Description 4" },
//   { id: 5, title: "Category 5", description: "Description 5" },
//   { id: 6, title: "Category 6", description: "Description 6" },
//   { id: 7, title: "Category 7", description: "Description 7" },
//   // Add more categories as needed
// ];

const TodayDeals = () => {
  const [categories, setCategories] = useState([]);
    useEffect(() => {
      fetch('http://localhost:3000/api/v1/products/get/featured/')
        .then(response => response.json())
        .then(json => setCategories(json))
        .catch(error => console.error(error));
    }, []);
    // console.log(categories);
  return (
    <div className="w-full h-96 items-end pt-16">
        <div className="w-1/5 h-full float-left bg-red-300">
            <Card/>
        </div>
        <div className="parent bg-yellow-300 w-4/5 h-full float-right">
            <Carousel
                responsive={responsive}
                autoPlay={true}
                infinite={true}
                swipeable={true}
                draggable={true}
                partialVisible={false}
                arrows={true}
                transitionDuration={150}
            >
                {categories.map((category) => {
                return (
                    <div className="slider" key={category.id}>
                        <ItemCard title={category.name} description={category.description} image={category.image}/>
                    </div>
                );
                })}
            </Carousel>
        </div>
    </div>
  );
};

export default TodayDeals;
