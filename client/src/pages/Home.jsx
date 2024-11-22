import React from 'react'
import Header from '../components/Header'
import SpeciallityMenu from '../components/SpeciallityMenu'
import TopDoctor from '../components/TopDoctor'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div className='mt-8'>
      <Header/>
      <SpeciallityMenu/>
      <TopDoctor/>
      <Banner/>
      
    </div>
  )
}

export default Home