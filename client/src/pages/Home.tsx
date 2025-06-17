import React from 'react';
import Hero from '../components/Hero';
import Speciality from '../components/Speciality';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
const Home: React.FC = () => {
  return (
    <div>
      <Hero/>
     <Speciality/>
     <TopDoctors/>
     <Banner/>
    </div>
  );
};

export default Home;