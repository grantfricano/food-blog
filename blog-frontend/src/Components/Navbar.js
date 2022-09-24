
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="nav">
          <div className='navbar-name'><Link to='/'>Food Blog</Link></div>
          <div><Link to='/blogs'>Blogs</Link></div>
          <div><Link to='/newblog'>New Post</Link></div>
          <div>My Work</div>
        </nav>    
    )
}

export default Navbar;