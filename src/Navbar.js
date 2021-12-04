import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const user = true;
  const [click, setClick] = useState(true);

  const handleClick = () => setClick(!click);
  return (
    <div className="top">
    

      <div className="topLeft">
      <Link to='/'>

      <img className='hawkImg' src="./hawk1.jpeg" />
      </Link>
      <p>Hawk Aerospace</p>
      </div>
    
      <div className="topCenter">
      <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
        <ul className="topList">
        {/* <Link className='link' to='/'>
            <li className="topListItem">HOME</li>
        </Link> */}
        {/* <Link className='link' to='/maps'>
            <li className="topListItem">ORDER</li>
        </Link> */}
        
          
        </ul>
      </div>
      <div className="topRight">
      <Link to='/maps'>
        <button>Order Drone</button>
      </Link>
        
      </div>
      
    </div>
  );
}