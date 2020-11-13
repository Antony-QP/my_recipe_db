import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import m from 'materialize-css'

export const Navbar = ({ title, icon }) => {
  return (
  <nav>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo">My Recipe<strong style={{ color : "var(--orange-color)"}}> DB</strong>.</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
        <Link to='/about'>About</Link>
        </li>
      </ul>
    </div>
  </nav>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}


export default Navbar