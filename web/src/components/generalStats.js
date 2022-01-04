import React, { Component } from 'react';

class GeneralStats extends Component {
    render() {
        return <div className={'grid'} style={{alignItems: 'center', height: '100%'}}>
          <div className='grid-item'>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '100%'}}>
                  <p>Num. transacciones:</p>
                  <p className= {'stats-number'}>XXX</p> 
                </td>
              </tr>
            </table>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '33%'}}>
                  <p>Prestar:</p>
                  <p className= {'stats-number'}>XXX</p>
                </td>
                <td style={{width: '33%'}}>
                  <p>Intercambiar:</p>
                  <p className= {'stats-number'}>XXX</p>
                </td>
                <td style={{width: '33%'}}>
                  <p>Dar:</p>
                  <p className= {'stats-number'} >XXX</p>
                </td>
              </tr>
            </table>
          </div>
          <div className='grid-item'>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '100%'}}>
                  <p>Num. productos:</p>
                  <p className= {'stats-number'} >XXX</p>
                </td>
              </tr>
              <tr>
                <td style={{width: '100%'}}>
                  <p>Prod. reportados:</p>
                  <a className= {'stats-number'}  href='/reports'>XXX</a>
                </td>
              </tr>
            </table>
          </div>
          <div className='grid-item'>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '100%'}}>
                  <p>Num. usuarios:</p>
                  <p className= {'stats-number'}>XXX</p>
                </td>
              </tr>
              <tr>
                <td style={{width: '100%'}}>
                  <p>Usu. reportados:</p>
                  <a className= {'stats-number'} href='/reports'>XXX</a>
                </td>
              </tr>
            </table> 
          </div>
          <div className='grid-item'>
            <p>Número de categorias:</p>
            <p className= {'stats-number'} >XXX</p>
            <a href='/category'>Gestionar categorias &gt;</a>
          </div>
          <div className='grid-item'>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '100%'}}>
                  <p>EcoPoints totales:</p>
                  <p className= {'stats-number'} >XXX</p>
                </td>
              </tr>
            </table>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '100%'}}>
                  <p>EcoPoints gastados:</p>
                  <p className= {'stats-number'}>XXX</p>
                </td>
              </tr>
            </table>
          </div>
          <div className='grid-item'>
            Sessiones activas
          </div>
        </div>;
    }

}

export default GeneralStats;