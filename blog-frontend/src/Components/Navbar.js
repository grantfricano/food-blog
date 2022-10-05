import { UserContext } from '../contexts/UserContext';
import { Link } from "react-router-dom";
import { useContext, useEffect } from 'react';

function Navbar() {

  const {token, setToken} = useContext(UserContext);
  const {user, setUser} = useContext(UserContext);

  function Logout() {
    setToken(null);
    localStorage.clear();
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
     setToken(token);
    }

    const username = JSON.parse(localStorage.getItem('username'));
    if (username) {
     setUser(username);
    }

  }, []);
  
  return (
      <nav className="nav">
        <div className='navbar-name'><Link to='/'>Food Blog</Link></div>
        <div><Link to='/blogs'>Blogs</Link></div>
        <div><Link to='/newblog'>New Post</Link></div>
        {token ? ( <div><Link to='/myprofile'>My Profile</Link></div>) : (<div><Link to='/login'>Log In</Link></div>)  } 
        {token ? ( <div><Link to='/' onClick={Logout}>Logout ({user})</Link></div>) : ''}
      </nav>    
  )
}

export default Navbar;