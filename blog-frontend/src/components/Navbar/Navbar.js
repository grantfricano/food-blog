import { UserContext } from '../../contexts/UserContext';
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import './Navbar.css';

function Navbar() {

  const {token, setToken} = useContext(UserContext);
  const {user, setUser} = useContext(UserContext);

  let [menuClicked, setMenuClicked] = useState(false);

  function Logout() {
    setToken(null);
    setUser(null);
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
      <nav className="navbar">
          <div className='navbar-name font-face-gren'><Link to='/'>something with ginger</Link></div>
          <div className='menu-icon' onClick={() => setMenuClicked(!menuClicked)}>
            <i className={menuClicked ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
          <ul className={menuClicked ? 'nav-menu active': 'nav-menu'}>
            <li className='nav-links' onClick={() => setMenuClicked(!menuClicked)}><Link to='/blogs'>Blogs</Link></li>
            <li className='nav-links' onClick={() => setMenuClicked(!menuClicked)}><Link to='/newblog'>New Post</Link></li>
            {token ? ( <li className='nav-links' onClick={() => setMenuClicked(!menuClicked)}><Link to='/myprofile'>My Profile</Link></li>) : (<li className='nav-links' onClick={() => setMenuClicked(!menuClicked)}><Link to='/login'>Log In</Link></li>)  } 
            {token ? ( <li className='nav-links' onClick={() => setMenuClicked(!menuClicked)}><Link to='/' onClick={Logout}>Logout ({user})</Link></li>) : ''}
          </ul>
      </nav>    
  )
}

export default Navbar;