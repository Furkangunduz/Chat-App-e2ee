import { Routes, Route } from 'react-router-dom'

import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import PrivateRoute from './components/PrivateRoute'
import StartChat from './views/StartChat'

function App() {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route path='/' element={<Home />} />
      </Route>
      <Route path='/start-chat' element={<PrivateRoute />}>
        <Route path='/start-chat' element={<StartChat />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default App;
