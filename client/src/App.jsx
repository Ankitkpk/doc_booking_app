import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Doctors from './pages/Doctors';
import About from './pages/About';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <BrowserRouter>
       <Navbar className='px-4'/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/About"  element={<About/>} />
          <Route path="/doctors" element={<Doctors/>} />
          <Route path='/doctors/:speciality'  element={<Doctors/>   }  />
          <Route path="/Appointment/:docId" element={<Appointment/>}  />
          <Route path='/profile' element={<profile/>} />
       </Routes>
       <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;

