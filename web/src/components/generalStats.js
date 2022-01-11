import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import APIService from "../services/API";
import ListCategories from './listCategories';

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
      Categ: undefined,
      numEcoPoints: 2500,
      numEPGastados: 1200,
      loading: true
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
        });
        APIService.get('/product/').then(
          response => {
            this.setState({
              numProd: response.data.length,
            });
            APIService.get('/admin/productsReported/').then(
              response => {
                this.setState({
                  numPReps: response.data,
                });
                APIService.get('/category/').then(
                  response => {
                    this.setState({
                      Categ: response.data,
                    });
                  }
                );
                APIService.get('/user/').then(
                  response => {
                    this.setState({
                      numUsu: response.data.length,
                      loading: false
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  }

  render() {
    const { numTrans, numPrestar, numInter, numDar, numProd, numPReps, numUsu, numUReps, Categ, numEcoPoints, numEPGastados, loading } = this.state;
    return (
      loading ?
        <div className="circularProgress" >
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
            <ListCategories categories={Categ} />
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
            Productos más vistos
          </div>
        </div>)
  }

}

export default GeneralStats;