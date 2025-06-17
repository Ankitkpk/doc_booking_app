import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import AppContextProvider from './context/Appcontext.tsx';
import DoctorContextProvider from './context/Doctorcontext.tsx';
import AdminContextProvider from './context/Admincontext.tsx';

createRoot(document.getElementById('root')!).render(
  <AdminContextProvider>
    <DoctorContextProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </DoctorContextProvider>
  </AdminContextProvider>
);
