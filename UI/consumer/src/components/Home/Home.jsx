import Categories from '../Categories/Categories';
import Hero from '../Hero/Hero';
import TodayDeals from '../TodaysDeals/TodayDeals';
import UserProfile from '../UserProfile/UserProfile';
import CountDown from "../Banners/CountDown"
import CategoriesMain from '../Categories/CategoriesMain';


const Home = () => {
    return (
        <div className={`w-screen min-h-[70vh] flex justify-center`}>
            <div className='w-[95vw] h-fit py-1'>
                <Hero/>
                {/* <CountDown/> */}
                <CategoriesMain/>
                {/* <Categories/> */}
                {/* <TodayDeals/>  */}
                {/* <TodayDeals/> */}
                {/* <UserProfile/> */}
            </div>
        </div>
    )
  };
  
  export default Home;