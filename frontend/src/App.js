import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './views/Home'
import Chat from './views/Chat'
import Login from './views/Login'
import Register from './views/Register'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/chat' element={<PrivateRoute />}>
          <Route path='/chat' element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
