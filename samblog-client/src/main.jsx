import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {

  RouterProvider,
} from "react-router-dom";
import router from './routes/Routes';
import AuthProviders from './provider/AuthProvider';
import { Toaster } from 'react-hot-toast';


// Create a client


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
  
    <RouterProvider router={router} />
  
    <Toaster />
    </AuthProviders>
  </React.StrictMode>,
)


