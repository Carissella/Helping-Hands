import React from 'react';
import { Link } from 'react-router-dom';
import App from "../App";

const Navbar = () => {
  const navLinks = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/login",
      label: "Login",
    },
    {
      path: "/signup",
      label: "Sign Up",
    },
    {
      path: "/profile",
      label: "Profile",
    },
    {
      path: "/schools",
      label: "Schools",
    },
  ];

  return (
    <nav className='navbar'>
      <ul>
        {navLinks.map((navLinks) => (
          <li key={navLinks.path}>
            <Link 
            to={navLinks.path} className="nav-links">
              {navLinks.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;