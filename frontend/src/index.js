import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { UserProvider } from './context/UserContext';
import { BrowserRouter as Router } from "react-router-dom"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <App />
        <ToastContainer />
      </UserProvider>
    </Router>
  </React.StrictMode>
);
