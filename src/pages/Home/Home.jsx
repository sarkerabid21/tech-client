import React from 'react';
import Banner from './Banner/Banner';

import Marquees from './Marquee/Marquees';

import FeaturedProducts from './FeaturedProducts/FeaturedProducts';
import TrendingProducts from './TrendingProducts/TrendingProducts';
import TopContributors from './TopContributors/TopContributors';
import Testimonials from './Testimonials/Testimonials';


const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
          
            <TopContributors></TopContributors>
            <Testimonials></Testimonials>
            
           
            <Marquees></Marquees>
           
        </div>
    );
};

export default Home;