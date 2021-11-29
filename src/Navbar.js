import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const user = true;
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
        <Link className='link' to='/'>
            <li className="topListItem">HOME</li>
        </Link>
        {/* <Link className='link' to='/details'>
            <li className="topListItem">ORDER</li>
        </Link> */}
        <Link className='link' to='/maps'>
            <li className="topListItem">ORDER</li>
        </Link>
        {/* <Link className='link' to='/maps2'>
            <li className="topListItem">MAPS2</li>
        </Link> */}
        {/* <Link className='link' to='/view'>
            <li className="topListItem">VIEW</li>
        </Link> */}
          
        </ul>
      </div>
      
    </div>
  );
}