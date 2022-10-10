import './App.css';
import React, { useState, useContext } from'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Blogs from './components/Blogs';
import NewBlog from './components/NewBlog';
import Blog from './components/Blog';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import CreateAccount from './components/CreateAccount';
import MyProfile from './components/MyProfile';
import ResetPassword from './components/ResetPassword';
import { UserContext } from './contexts/UserContext';

function App() {
  
  const [token, setToken] = useState('');
  const [user, setUser]  = useState(null);
  
  return (
    <UserContext.Provider value={ {user, setUser, token, setToken}  }>

      <div className="App"> 
        <Navbar />

        <Routes>
          <Route path='/' />
          <Route path='/login' element={<Login />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/newblog' element={<NewBlog />} />
          <Route path='/blog/:id/:title' element={<Blog />} />
          <Route path='/createaccount' element={<CreateAccount />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/resetpassword/:resetToken' element={<ResetPassword />} />
        </Routes>

      </div>

    </UserContext.Provider>
  );
}

export default App;
