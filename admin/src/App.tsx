
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import { useAdminContext } from './hooks/useAdminContext';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import AddDoctor from './pages/Admin/Adddoctor';
import Allapointsments from './pages/Admin/Allapointsments';
import DoctorList from './pages/Admin/DoctorList';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import { useDoctorContext } from './hooks/useDoctorContext';
import Dashboard from './pages/Admin/Dashboard'; 

const App = () => {
  const { token } = useAdminContext();
  const { dtoken } = useDoctorContext();

  return (
    <BrowserRouter>
      {token || dtoken ? (
        <div>
          <Navbar />
          <div className="flex items-start p-2">
            <Sidebar />
            <Routes>
              <Route path="/" element={<></>} />

              {/* Admin routes */}
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/add-doctors" element={<AddDoctor />} />
              <Route path="/all-appointments" element={<Allapointsments />} />
              <Route path="/doctor-list" element={<DoctorList />} />

              {/* Doctor routes */}
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor-appointment" element={<DoctorAppointment />} />
              <Route path="/doctor-profile" element={<DoctorProfile/>} />
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
