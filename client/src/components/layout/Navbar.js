import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import m from 'materialize-css'

export const Navbar = () => {
  return (
  <nav>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo center">My Recipe<strong style={{ color : "var(--orange-color)"}}> DB</strong>.</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li>
          <Link className="link" to='/'>Home</Link>
        </li>
        <li>
        <Link className="link" to='/about'>About</Link>
        </li>
        <li>
          <Link className="link" to='/login'>Login</Link>
        </li>
        <li>
        <Link className="link" to='/register'>Register</Link>
        </li>
      </ul>
    </div>
  </nav>
  )
}



export default Navbar