import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import APIService from "../services/API";

class GeneralStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      loading: false
    };
  }

  componentDidMount() {
		APIService.get('/admin/transactions/').then(
			response => {
				this.setState({
					numTrans: response.data.totalTrades,
          numPrestar: response.data.tradesLoans,
          numInter: response.data.tradesExchange,
          numDar: response.data.tradesGiven,
					loading: false
				});
			}
		);
	}

  render() {
    const { numTrans, numPrestar, numInter, numDar, numProd, numPReps, numUsu, numUReps, numCateg, numEcoPoints, numEPGastados, loading } = this.state;
    return (
      loading ?
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
          <CircularProgress color="inherit" />
        </div>
        :

        <div className={'grid'} style={{ alignItems: 'center', height: '100%' }}>
          <div className='grid-item'>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ width: '100%' }}>
                    <p>Num. transacciones:</p>
                    <p className={'stats-number'}>{numTrans}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ width: '33%' }}>
                    <p>Prestar:</p>
                    <p className={'stats-number'}>{numPrestar}</p>
                  </td>
                  <td style={{ width: '33%' }}>
                    <p>Intercambiar:</p>
                    <p className={'stats-number'}>{numInter}</p>
                  </td>
                  <td style={{ width: '33%' }}>
                    <p>Dar:</p>
                    <p className={'stats-number'} >{numDar}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='grid-item'>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ width: '100%' }}>
                    <p>Num. productos:</p>
                    <p className={'stats-number'} >{numProd}</p>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '100%' }}>
                    <p>Prod. reportados:</p>
                    <a className={'stats-number'} href='/reports'>{numPReps}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='grid-item'>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ width: '100%' }}>
                    <p>Num. usuarios:</p>
                    <p className={'stats-number'}>{numUsu}</p>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '100%' }}>
                    <p>Usu. reportados:</p>
                    <a className={'stats-number'} href='/reports'>{numUReps}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='grid-item'>
            <p>Número de categorias:</p>
            <p className={'stats-number'} >{numCateg}</p>
            <a href='/category'>Gestionar categorias &gt;</a>
          </div>
          <div className='grid-item'>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ width: '100%' }}>
                    <p>EcoPoints totales:</p>
                    <p className={'stats-number'} >{numEcoPoints}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ width: '100%' }}>
                    <p>EcoPoints gastados:</p>
                    <p className={'stats-number'}>{numEPGastados}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='grid-item'>
            Sessiones activas
          </div>
        </div>)
  }

}

export default GeneralStats;