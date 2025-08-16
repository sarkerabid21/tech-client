import React from 'react';
import Banner from './Banner/Banner';

import Marquees from './Marquee/Marquees';

import FeaturedProducts from './FeaturedProducts/FeaturedProducts';
import TrendingProducts from './TrendingProducts/TrendingProducts';
import TopContributors from './TopContributors/TopContributors';
import Testimonials from './Testimonials/Testimonials';
import { WorldMap } from './WorldMap';
import TechPlatformSection from './TechPlatformSectio';


const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
          
            <TopContributors></TopContributors>
            <Testimonials></Testimonials>
            
           <div className="p-10 bg-pink-100">
      <h1 className="text-xl md:text-4xl text-center font-bold mb-4 text-pink-700">We Are Here for You Worldwide</h1>
      <WorldMap
        dots={[
          { start: { lat: 64.2, lng: -149.5 }, end: { lat: 34.05, lng: -118.24 } }, // Alaska to LA
          { start: { lat: 51.5, lng: -0.12 }, end: { lat: 28.6, lng: 77.2 } }, // London to New Delhi
          { start: { lat: -15.79, lng: -47.89 }, end: { lat: 38.72, lng: -9.13 } }, // Brasilia to Lisbon
        ]}
      />
    </div>
            <Marquees></Marquees>
           <TechPlatformSection></TechPlatformSection>
           
        </div>
    );
};

export default Home;