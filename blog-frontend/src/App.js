import './App.css';
import React, { useState } from'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import CreateAccount from './components/CreateAccount/CreateAccount';
import AllPosts from './components/AllPosts/AllPosts';
import OnePost from './components/OnePost/OnePost';
import MyProfile from './components/MyProfile';
import ResetPassword from './components/ResetPassword';
import { UserContext } from './contexts/UserContext';

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
        <div className='grid-container'>
           <div className='nav-grid '>
              <Navbar handleLoginClick={handleLoginClick} setIsCreateAccount={setIsCreateAccount}/>
              
              <Login isShowLogin={isShowLogin} setIsShowLogin={setIsShowLogin} setIsCreateAccount={setIsCreateAccount} setIsForgotPW={setIsForgotPW}/>
              <CreateAccount isCreateAccount={isCreateAccount} setIsCreateAccount={setIsCreateAccount} setIsShowLogin={setIsShowLogin}/>
              <ForgotPassword isForgotPW={isForgotPW} setIsForgotPW={setIsForgotPW} setIsShowLogin={setIsShowLogin}/>
          </div>
          <div className='body-grid'>
            <Routes>
              <Route path='/' element={<AllPosts />} />
              <Route path='/:slug'  element={<OnePost />} />
              <Route path='/myprofile' element={<MyProfile />} />
              <Route path='/forgotpassword' element={<ForgotPassword />} />
              <Route path='/resetpassword/:resetToken' element={<ResetPassword />} />
            </Routes>
          </div>
        </div>
      </div>

    </UserContext.Provider>
  );
}

export default App;
