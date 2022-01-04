import React, { Component } from 'react';

class GeneralStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      numTrans: 100,
      numPrestar: 25,
      numInter: 50,
      numDar: 25,
      numProd: 1450,
      numPReps: 150,
      numUsu: 250,
      numUReps: 120,
      numCateg: 12,
      numEcoPoints: 2500,
      numEPGastados: 1200,
    };
  }


    render() {
      const { numTrans, numPrestar, numInter, numDar, numProd, numPReps, numUsu, numUReps, numCateg, numEcoPoints, numEPGastados } = this.state;
        return <div className={'grid'} style={{alignItems: 'center', height: '100%'}}>
          <div className='grid-item'>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '100%'}}>
                  <p>Num. transacciones:</p>
                  <p className= {'stats-number'}>{numTrans}</p> 
                </td>
              </tr>
            </table>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '33%'}}>
                  <p>Prestar:</p>
                  <p className= {'stats-number'}>{numPrestar}</p>
                </td>
                <td style={{width: '33%'}}>
                  <p>Intercambiar:</p>
                  <p className= {'stats-number'}>{numInter}</p>
                </td>
                <td style={{width: '33%'}}>
                  <p>Dar:</p>
                  <p className= {'stats-number'} >{numDar}</p>
                </td>
              </tr>
            </table>
          </div>
          <div className='grid-item'>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '100%'}}>
                  <p>Num. productos:</p>
                  <p className= {'stats-number'} >{numProd}</p>
                </td>
              </tr>
              <tr>
                <td style={{width: '100%'}}>
                  <p>Prod. reportados:</p>
                  <a className= {'stats-number'}  href='/reports'>{numPReps}</a>
                </td>
              </tr>
            </table>
          </div>
          <div className='grid-item'>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '100%'}}>
                  <p>Num. usuarios:</p>
                  <p className= {'stats-number'}>{numUsu}</p>
                </td>
              </tr>
              <tr>
                <td style={{width: '100%'}}>
                  <p>Usu. reportados:</p>
                  <a className= {'stats-number'} href='/reports'>{numUReps}</a>
                </td>
              </tr>
            </table> 
          </div>
          <div className='grid-item'>
            <p>Número de categorias:</p>
            <p className= {'stats-number'} >{numCateg}</p>
            <a href='/category'>Gestionar categorias &gt;</a>
          </div>
          <div className='grid-item'>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '100%'}}>
                  <p>EcoPoints totales:</p>
                  <p className= {'stats-number'} >{numEcoPoints}</p>
                </td>
              </tr>
            </table>
            <table style={{width: '100%'}}>
              <tr>
                <td style={{width: '100%'}}>
                  <p>EcoPoints gastados:</p>
                  <p className= {'stats-number'}>{numEPGastados}</p>
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