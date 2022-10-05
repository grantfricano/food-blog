import { UserContext } from '../contexts/UserContext';
import { Link } from "react-router-dom";
import { useContext } from 'react';

function Navbar() {

  const {token, setToken} = useContext(UserContext);
  const {user} = useContext(UserContext);

  function Logout() {
    setToken(null);
  }
  
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