import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="NavBar">
      <Link to="/app/feed">
        <span className="icon">
          <i className="fas fa-home fa-lg" />
        </span>
      </Link>
      <Link to="/app/map">
        <span className="icon">
          <i className="fas fa-map-marker fa-lg" />
        </span>
      </Link>
      <Link to="/app/new">
        <span className="icon">
          <i className="fas fa-plus fa-lg" />
        </span>
      </Link>
      <Link to="/app/friends">
        <span className="icon">
          <i className="fas fa-user-friends fa-lg" />
        </span>
      </Link>
      <Link to="/app/profile">
        <span className="icon">
          <i className="fas fa-user fa-lg" />
        </span>
      </Link>
    </nav>
  );
};

export default NavBar;
