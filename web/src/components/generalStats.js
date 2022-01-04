import React, { Component } from 'react';

class GeneralStats extends Component {
    render() {
        return <div className={'grid'} style={{alignItems: 'center', height: '100%'}}>
          <div className='grid-item'>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '100%'}}>
                  <p>Num. transacciones:</p>
                  <p style={{color: 'blue'}}>XXX</p> 
                </td>
              </tr>
            </table>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '33%'}}>
                  <p>Prestar:</p>
                  <p style={{color: 'green'}}>XXX</p>
                </td>
                <td style={{width: '33%'}}>
                  <p>Intercambiar:</p>
                  <p style={{color: 'orange'}}>XXX</p>
                </td>
                <td style={{width: '33%'}}>
                  <p>Dar:</p>
                  <p style={{color: 'yellow'}}>XXX</p>
                </td>
              </tr>
            </table>
          </div>
          <div className='grid-item'>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '100%'}}>
                  <p>Num. productos:</p>
                  <p style={{color: 'blueviolet'}}>XXX</p>
                </td>
              </tr>
              <tr>
                <td style={{width: '100%'}}>
                  <p>Prod. reportados:</p>
                  <p style={{color: 'red'}}>XXX</p>
                </td>
              </tr>
            </table>
          </div>
          <div className='grid-item'>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '100%'}}>
                  <p>Num. usuarios:</p>
                  <p style={{color: 'blueviolet'}}>XXX</p>
                </td>
              </tr>
              <tr>
                <td style={{width: '100%'}}>
                  <p>Usu. reportados:</p>
                  <p style={{color: 'red'}}>XXX</p>
                </td>
              </tr>
            </table> 
          </div>
        </div>;
    }

}

export default GeneralStats;