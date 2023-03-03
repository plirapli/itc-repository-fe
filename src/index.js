import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import './index.css';
import Main from './pages/Main';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
