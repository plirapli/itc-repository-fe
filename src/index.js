import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileProvider';
import './index.css';
import Main from './pages/Main';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ProfileProvider>
        <Main />
      </ProfileProvider>
    </React.StrictMode>
  </BrowserRouter>
);
