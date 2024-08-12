import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './App';
import { RouterProvider } from 'react-router-dom';
import './index.css'
import AuthProvider from './contexts/authContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
