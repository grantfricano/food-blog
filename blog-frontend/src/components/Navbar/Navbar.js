import { UserContext } from '../../contexts/UserContext';
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import './Navbar.css';

function Navbar( {handleLoginClick, setIsCreateAccount} ) {

  const {token, setToken} = useContext(UserContext);
  const {user, setUser} = useContext(UserContext);

  let [menuClicked, setMenuClicked] = useState(false);

  const handleClick = () => {
    setMenuClicked(!menuClicked)
    setIsCreateAccount(false);
    handleLoginClick();
  }

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
    <>
    <nav  className="navbar">
   
    <li className='nav-links'><Link> <i class="fa-solid fa-pizza-slice"></i></Link></li>
    <br/><br/><br/>
      <li className='nav-links'><Link> <i class="fa-solid fa-motorcycle"></i></Link></li>
      <br/><br/>

     <div className='navbar-name font-face-gren'><Link to='/'>something<br />with<br /> ginger</Link></div>
      <br/> <br/>
        {token ? ( <li className='nav-links' onClick={() => setMenuClicked(!menuClicked)}><Link to='/myprofile'>my profile</Link></li>) : (<li className='nav-links' onClick={(handleClick)}><Link>login</Link></li>)  } 
        {token ? ( <li className='nav-links' onClick={() => setMenuClicked(!menuClicked)}><Link to='/' onClick={Logout}>logout ({user})</Link></li>) : ''}
         
     
      {/* <nav className='navbar-image'>
          <div className='menu-icon' onClick={() => setMenuClicked(!menuClicked)}>
            <i className={menuClicked ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
          <ul className={menuClicked ? 'nav-menu active': 'nav-menu'}>
            {token ? ( <li className='nav-links' onClick={() => setMenuClicked(!menuClicked)}><Link to='/myprofile'>My Profile</Link></li>) : (<li className='nav-links' onClick={(handleClick)}><Link>Log In</Link></li>)  } 
            {token ? ( <li className='nav-links' onClick={() => setMenuClicked(!menuClicked)}><Link to='/' onClick={Logout}>Logout ({user})</Link></li>) : ''}
          </ul>
      </nav>     */}
      </nav>
      {/* <div className='navbar-image'></div> */}
      </>
  )
}

export default Navbar;