import React from 'react'
import Header from '../components/Header'
import TopDoctor from '../components/TopDoctor'
import SpeciallityMenu from '../components/SpecialityMenu'

const Home = () => {
  return (
    <div className='px-4'>
      <Header/>
      <SpeciallityMenu/>
      <TopDoctor/>
    </div>
  )
}

export default Home