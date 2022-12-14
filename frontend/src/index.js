import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
import { UserProvider } from './context/UserContext'
import { ChatProvider } from "./context/ChatContext"
import { SocketProvider } from "./context/SocketContext"
import { BrowserRouter as Router } from "react-router-dom"

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <ChatProvider>
      <UserProvider>
        <SocketProvider>
          <App />
          <ToastContainer />
        </SocketProvider>
      </UserProvider>
    </ChatProvider>
  </Router >
);
