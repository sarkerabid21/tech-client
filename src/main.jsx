import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  RouterProvider,
} from "react-router";
import { router } from './router/router.jsx';

// import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Aos from 'aos';
import AuthProvider from './contexts/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
// ..
Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className=' font-urbanist '>
 <AuthProvider>
  <>
  <RouterProvider router={router} />
  </>
   <Toaster position="top-right" reverseOrder={false} />
 </AuthProvider>
    </div>
   
  </StrictMode>,
)