import React, { useState } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import style from './AddCurrency.module.css';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const AddCurrency = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const checkLengthValidity = () => {
        if(inputValue.length !== 3){
            setErrorMessage("The currency code must be 3 letters long.");
            return false;
        } else {
            return true;
        }
    };

    const inputChangedHandler = (event) => {
        setInputValue(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if(!(props.currenciesCodes).includes(inputValue.toLowerCase()) && checkLengthValidity()){
            axios.get('http://api.nbp.pl/api/exchangerates/rates/a/' + inputValue.toLowerCase())
            .then((res) =>{
                const currencyObject = {
                    code: res.data.code,
                    currency: res.data.currency,
                    rate: res.data.rates[0].mid
                };
                const codes = props.currenciesCodes.concat();
                codes.push(inputValue.toLocaleLowerCase());localStorage.setItem("fav", JSON.stringify(codes));
                props.onCurrencyAdded(currencyObject);
                setInputValue('');
                setErrorMessage(null);
            })
            .catch((error) => {
                axios.get('http://api.nbp.pl/api/exchangerates/rates/b/' + inputValue.toLowerCase())
                .then((res) =>{
                    const currencyObject = {
                        code: res.data.code,
                        currency: res.data.currency,
                        rate: res.data.rates[0].mid
                    };
                    const codes = props.currenciesCodes.concat();
                    codes.push(inputValue.toLocaleLowerCase());
                    localStorage.setItem("fav", JSON.stringify(codes));
                    props.onCurrencyAdded(currencyObject);
                    setInputValue('');
                    setErrorMessage(null);
                })
                .catch((error) => {
                    if(error.response) {
                        setErrorMessage("There is no data for this code");
                    }
                    else {
                        setErrorMessage("Something is wrong! Try again later");
                    }
                });
            });
        }
    };

    let errorInfo = null;
    if(errorMessage) {
        errorInfo = <p>{errorMessage}</p>;
    }

    let form = (
        <form onSubmit={submitHandler}>
            <Input 
                changed={(event) => inputChangedHandler(event)}
                value={inputValue}
                type={'text'}
                placeholder={'Currency Code'}
            />
            <Button btnType={"Submit"}>Submit</Button>
        </form>
    );

    return (
        <div className={style.AddCurrency}>
            <p>Enter the code of the currency You want to watch. Codes available <a href="https://pl.wikipedia.org/wiki/ISO_4217" target="_blank" rel="noreferrer">here</a>.</p>
            {errorInfo}
            {form}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        currenciesCodes: state.currency.currenciesCodes,
        currenciesObjects: state.currency.currenciesObjects
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCurrencyAdded: (currencyData) => dispatch(actions.addCurrency(currencyData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCurrency);