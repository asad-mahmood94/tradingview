import './App.css'
import { BrowserRouter, Routes, Route, useLocation, Router } from 'react-router-dom';
import Home from './Home';
import Community from './Community/Community';
import Post from './More/Post';
import UserList from './navcomponent/UserList';
import UserCrud from './UserCrud';
import Registered from './navcomponent/Registered';
import Login from './navcomponent/Login';
import ForgotPassword from './navcomponent/ForgotPassword';
import ResetPassword from './navcomponent/ResetPassword';

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>

          <Route index element={<Home />} />
          <Route path="/registered" element={<Registered />} />
          <Route path="/Community/Trading-ideas" element={<Community />} />
          <Route path="/products/Supercharts" element={<UserList />} />
          <Route path="/user-crud" element={<UserCrud />} />
          <Route path="/More/Posts" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
