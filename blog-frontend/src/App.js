import './App.css';
import React from'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Blogs from './Components/Blogs';
import NewBlog from './Components/NewBlog';
import Blog from './Components/Blog';

function App() {
  return (
    <div className="App"> 
      <Navbar />
      <div className='container'>
      <Routes>
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/newblog' element={<NewBlog />} />
        <Route path='/blog/:id' element={<Blog />} />
      </Routes>
      </div>
      
    </div>
  );
}

export default App;
