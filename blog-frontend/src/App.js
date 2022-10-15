import './App.css';
import React, { useState, useContext } from'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Blogs from './components/Blogs';
import NewBlog from './components/NewBlog';
import Blog from './components/Blog';
import Login from './components/Login/Login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import CreateAccount from './components/CreateAccount/CreateAccount';
import MyProfile from './components/MyProfile';
import ResetPassword from './components/ResetPassword';
import { UserContext } from './contexts/UserContext';
import './fonts/kirsty/kirstybdit.otf';

function App() {
  
  const [token, setToken] = useState('');
  const [user, setUser]  = useState(null);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isForgotPW, setIsForgotPW] = useState(false);

  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  }

  const handleAccountCreateClick = () => {
    setIsCreateAccount((isCreateAccount) => !isCreateAccount); 
  }
  
  return (
    <UserContext.Provider value={ {user, setUser, token, setToken}  }>

      <div className="App"> 
        <Navbar handleLoginClick={handleLoginClick} setIsCreateAccount={setIsCreateAccount}/>
        
        <Login isShowLogin={isShowLogin} setIsShowLogin={setIsShowLogin} setIsCreateAccount={setIsCreateAccount} setIsForgotPW={setIsForgotPW}/>
        <CreateAccount isCreateAccount={isCreateAccount} setIsCreateAccount={setIsCreateAccount} setIsShowLogin={setIsShowLogin}/>
        <ForgotPassword isForgotPW={isForgotPW} setIsForgotPW={setIsForgotPW} setIsShowLogin={setIsShowLogin}/>
        
        <Routes>
          <Route path='/' />
          <Route path='/blog/:id/:title' element={<Blog />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/resetpassword/:resetToken' element={<ResetPassword />} />
        </Routes>

      </div>

    </UserContext.Provider>
  );
}

export default App;
