import './App.css';
import React from'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Blogs from './components/Blogs';
import NewBlog from './components/NewBlog';
import Blog from './components/Blog';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

function App() {
  return (
    <div className="App"> 
      <Navbar />
      <div className='container'>
      <Routes>
        <Route path='/' element={<Login /> } />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/newblog' element={<NewBlog />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/createaccount' element={<CreateAccount />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
