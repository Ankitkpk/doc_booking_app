
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import Login from './pages/Login';
import MyAppointment from './pages/MyAppointment';
import Appointments from './pages/Appointments';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppointmentHistory from './pages/AppointmentHistry';
const App = () => {
  return (
    
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
        <BrowserRouter>
         <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/doctors/:speciality' element={<Doctors/>}/>
          <Route path='/alldoctors' element={<Doctors/>}/>
          <Route path='/contact' element={<Contact/>}/>
           <Route path='/appointment-history' element={<AppointmentHistory/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/my-appointments' element={<MyAppointment/>}/>
          <Route path='/appointment/:docId' element={<Appointments/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
        <Footer/>
        </BrowserRouter>
    </div>
  )
}

export default App