import React, { Component } from 'react';
import logo from '../logoCirculoGrandeRESOLSUPERPEQUE.png'

class Navbar extends Component {
  render() {
    return <nav>
      <ul>
        <li><a href='/'><img src={logo}/><b> 4me4u</b></a></li>
        <li><a href='/reports'>Gestionar denuncias</a></li>
        <li><a href='/category'>Gestionar categorias</a></li>
        <li><a style={{float: 'bottom'}} href='/user'>Hola user!</a></li>
      </ul>
    </nav>;
  }
}

export default Navbar;