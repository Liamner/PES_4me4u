import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import APIService from "../services/API";

class Login extends Component {
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
    <div className="login">
    <h1>Please Log In</h1>
    <form>
      <label>
        <p>Username</p>
        <input type="text" />
      </label>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
  
  }

}

export default Login;