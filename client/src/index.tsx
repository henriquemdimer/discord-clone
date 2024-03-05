import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthPage from './pages/Auth';
import ChatPage from './pages/Chat';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChatPage />
  },
  {
    path: '/login',
    element: <AuthPage method='login' />
  },
  {
    path: '/register',
    element: <AuthPage method='register' />
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
