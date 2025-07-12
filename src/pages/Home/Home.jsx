import React from 'react';
import Banner from './Banner/Banner';
// import Services from './Services/Services';
// import OurServices from './Services/OurServices';
// import Marquee from './Marquee/Marquees';
import Marquees from './Marquee/Marquees';
import BenifitsCard from './Benifits/BenifitsCard';
import BeMarchant from './BeMarchant/BeMarchant';
import FeaturedProducts from './FeaturedProducts/FeaturedProducts';
import TrendingProducts from './TrendingProducts/TrendingProducts';
import TopContributors from './TopContributors/TopContributors';
import Testimonials from './Testimonials/Testimonials';
// import AnimatedStats from './AnimatedStat/AnimatedStats';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            {/* <Services></Services> */}
            <TopContributors></TopContributors>
            <Testimonials></Testimonials>
            
           
            <Marquees></Marquees>
            <BenifitsCard></BenifitsCard>
            <BeMarchant></BeMarchant>
        </div>
    );
};

export default Home;