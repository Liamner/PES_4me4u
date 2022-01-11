import React, { Component } from 'react';
import logo from '../logoCirculoGrandeRESOLSUPERPEQUE.png'

function getUser() {
  const userString = sessionStorage.getItem('user');
  return JSON.parse(userString)
}

function signOut() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  window.location.reload();
}

class Navbar extends Component {
  render() {
    return <nav>
      <ul>
        <li><a href='/'><img src={logo}/><b> 4me4u</b></a></li>
        <li><a href='/reports'>Gestionar denuncias</a></li>
        <li><span>Hola {getUser()}!</span></li>
        <li><span className='signOut' onClick={signOut}>Cerrar sessión</span></li>
      </ul>
    </nav>;
  }
}

export default Navbar;