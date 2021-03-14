import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';

import AddCurrency from './containers/AddCurrency/AddCurrency';
import List from './containers/List/List';
import Backdrop from './components/Backdrop/Backdrop';

const App = (props) => {
  const [showBackdrop, setShowBackdrop] = useState(false);

  useEffect(() => {
    const favouriteCurrenciesCodes = JSON.parse(localStorage.getItem("fav"));
    if(favouriteCurrenciesCodes){
      for(let item of favouriteCurrenciesCodes){
        axios.get('http://api.nbp.pl/api/exchangerates/rates/a/' + item.toLowerCase())
        .then(res => {
            const currencyObject = {
                code: res.data.code,
                currency: res.data.currency,
                rate: res.data.rates[0].mid
            };
            props.onCurrencyAdded(currencyObject);
        })
        .catch((error) => {
          axios.get('http://api.nbp.pl/api/exchangerates/rates/b/' + item.toLowerCase())
          .then((res) =>{
              const currencyObject = {
                  code: res.data.code,
                  currency: res.data.currency,
                  rate: res.data.rates[0].mid
              };
              props.onCurrencyAdded(currencyObject);
          })
          .catch((error) => {

          });
        });
      }
    }
  }, []);

  const backdropShowHandler = () => {
    setShowBackdrop(!showBackdrop);
  }

  return (
    <div className="App">
      <Backdrop show={showBackdrop} />
      <AddCurrency />
      <List switchBackdrop={backdropShowHandler} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currenciesCodes: state.currency.currenciesCodes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCurrencyAdded: (currencyData) => dispatch(actions.addCurrency(currencyData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
