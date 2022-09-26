import { Routes, Route } from 'react-router-dom'

import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import PrivateRoute from './components/PrivateRoute'
import AddFriend from './views/AddFriend'

function App() {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route path='/' element={<Home />} />
      </Route>
      <Route path='/add-friend' element={<PrivateRoute />}>
        <Route path='/add-friend' element={<AddFriend />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default App;
