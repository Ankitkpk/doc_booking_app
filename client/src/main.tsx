import { createRoot } from 'react-dom/client'
import AppContextProvider from './context/AppContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
  

)
