import './App.css';
import React, { useState } from'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Blogs from './components/Blogs';
import NewBlog from './components/NewBlog';
import Blog from './components/Blog';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

function App() {
  
    const [token, setToken] = useState('');

    // if(!token) {
    //   return <Login setToken={setToken} />
    // }
  
  return (
    <div className="App"> 
      <Navbar token={token} setToken={setToken}/>
      <div className='container'>
      <Routes>
        <Route path='/' />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/newblog' element={<NewBlog />} />
        <Route path='/blog/:id' element={<Blog token={token}/>} />
        <Route path='/createaccount' element={<CreateAccount />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
