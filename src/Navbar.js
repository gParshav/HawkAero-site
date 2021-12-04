import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const user = true;
  const [click, setClick] = useState(true);

  const handleClick = () => setClick(!click);
  return (
    // <div className="top justify-content-between ">
    

    //   <div className="">
    //   <Link to='/'>
    //     <img className='hawkImg' src="./hawk1.jpeg" />
    //   </Link>
    //   <span className='text-dark'>Hawk Aerospace</span>
    //   </div>
    //   <div className="">
    //   <Link to='/maps'>
    //     <button className='drone'>Order Drone</button>
    //   </Link>
        
    //   </div>
      
    // </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    
    <Link to='/'>
       <img className='hawkImg' src="./hawk1.jpeg" />
     
     <span class="navbar-brand">Hawk Aerospace</span>
     </Link>
     
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
        <a class="nav-link" href="#">Features</a>
        <a class="nav-link" href="#">Pricing</a>
        <a class="nav-link disabled">Disabled</a>
        
      </div>
      <Link to='/maps'>
       <button className='drone'>Book Drone</button>
       </Link>
    </div>
    
  </div>
  
</nav>
  );
}