import React from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import { useAdminContext } from './hooks/useAdminContext';
import Navbar from './components/Navbar';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import AddDoctor from './pages/Admin/Adddoctor';
import Allapointsments from './pages/Admin/Allapointsments';
import DoctorList from './pages/Admin/DoctorList';
import Dashboard from './pages/Admin/Dashboard';

const App = () => {
  const { token } = useAdminContext();

  return (
    <BrowserRouter>
      {token ? (
        <div >
          <Navbar />
          <div className='flex items-start p-2'>
            <Sidebar/>
            <Routes>
              <Route path='/' element={<></>}/>
              <Route path='/admin-dashboard' element={<Dashboard/>}/>
              <Route path='/add-doctors' element={<AddDoctor/>}/>
              <Route path='/all-appointments' element={<Allapointsments/>}/>
              <Route path='/doctor-list' element={<DoctorList/>}/>
            </Routes>
          </div>
        </div>
      ) : (
        <Login />
      )}
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
