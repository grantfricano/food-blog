
import { Link } from "react-router-dom";

function Navbar( {token}, {setToken} ) {

  function Logout() {
    setToken(null);
  }
  
  return (
      <nav className="nav">
        <div className='navbar-name'><Link to='/'>Food Blog</Link></div>
        <div><Link to='/blogs'>Blogs</Link></div>
        <div><Link to='/newblog'>New Post</Link></div>
        {token ? ( <div><Link to='/myprofile' /* onClick={Logout}*/ >My Profile</Link></div>) : (<div><Link to='/login'>Log In</Link></div>)  } 
      </nav>    
  )
}

export default Navbar;