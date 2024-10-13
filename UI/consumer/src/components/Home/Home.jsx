import Categories from '../Categories/Categories';
import Hero from '../Hero/Hero';
import TodayDeals from '../TodaysDeals/TodayDeals';
import UserProfile from '../UserProfile/UserProfile';

const Home = () => {
    return (
        <div className={`w-screen min-h-[70vh]`}>
            {/* <Hero/> */}
            <Categories/>
            {/* <TodayDeals/>  */}
            {/* <TodayDeals/> */}
            {/* <UserProfile/> */}
        </div>
    )
  };
  
  export default Home;