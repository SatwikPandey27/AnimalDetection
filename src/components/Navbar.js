import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

export default function Navbar(props) {
  return (
    <div>
      <nav className='navbar navbar-expand-lg' style={{backgroundColor: props.mode === 'light'?'#DFE7FF':'#212121'}}>
        <div className="container-fluid">
          <Link className={`navbar-brand text-${props.mode === 'light' ? 'dark' : 'light'}`} to="/">{props.title}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className={`nav-link text-${props.mode === 'light' ? 'dark' : 'light'}`} to="/about">About Us</Link>
            </div>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" onClick={props.toggleMode} role="switch" id="flexSwitchCheckDefault"/>
            <label className={`form-check-label text-${props.mode === 'light' ? 'dark' : 'light'}`} htmlFor="flexSwitchCheckDefault">Enable {props.mode === 'light' ? 'Dark' : 'Light'} Mode</label>
          </div>
        </div>
      </nav>
    </div>
  );
}

// Defining datatypes of props or proptypes
Navbar.propTypes = {
  title: PropTypes.string,
};

// Defining default props for props
Navbar.defaultProps = {
  title: 'Set title here',
};
