import React, { Component } from 'react';
import logo from '../logoCirculoGrandeRESOLSUPERPEQUE.png'

class Reports extends Component {
    render() {
        return <nav>
          <ul>
            <li><a style={{fontWeight: 'bold'}} href='/'><img src={logo}/> 4me4u</a></li>
            <li><a href='/reports'>Denuncias</a></li>
            <li style={{float: 'right'}}><a href='/user'>Hola user!</a></li>
          </ul>
        </nav>;
    }

}

export default Reports;