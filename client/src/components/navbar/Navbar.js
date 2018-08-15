import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span class="navbar-brand"><Link className="navbar-brand" to="/">Triplan</Link></span>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Make triplan</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/MyTrips">My Trips</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item"><Link to="/Login"><button class="btn btn-sm btn-outline-secondary my-2 my-sm-0" type="button">Log In</button></Link></li>
        </ul>
      </nav >
    );
  }
}

export default Navbar;