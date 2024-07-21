import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setIsLoggedIn(false); // Update state
    navigate('/'); // Redirect to home or login page
  };

  return (
    <div className='navbar'>
      <img src={assets.logo} alt='' className='logo'/>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</a>
        <a href='#resform' onClick={() => setMenu('reservation')} className={menu === 'reservation' ? 'active' : ''}>Reservation</a>
        <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>Mobile App</a>
        <a href='#footer' onClick={() => setMenu('contact us')} className={menu === 'contact us' ? 'active' : ''}>Contact Us</a>
      </ul>
      <div className='navbar-right'>
        <div className='navbar-search-icon'>
          <img src={assets.basket_icon} alt='' />
          <div className='dot'></div>
        </div>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Log Out</button>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
