import * as actionTypes from './actionTypes';

export const addCurrency = (currencyObject) => {
    return {
        type: actionTypes.ADD_CURRENCY,
        currencyObject: currencyObject
    };
};

export const removeCurrency = (currencyObject) => {
    return {
        type: actionTypes.REMOVE_CURRENCY,
        currencyObject: currencyObject
    };
};

export const removeAllCurrencies = () => {
    return {
        type: actionTypes.REMOVE_ALL_CURRENCIES
    };
};