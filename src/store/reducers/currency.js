import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currenciesObjects: [],
    currenciesCodes: []
};

const addCurrency = (state, action) => {
    let updatedCurrenciesObjects, updatedCurrenciesCodes;
    updatedCurrenciesObjects = state.currenciesObjects.concat();
    updatedCurrenciesObjects.push(action.currencyObject);

    updatedCurrenciesCodes = state.currenciesCodes.concat();
    updatedCurrenciesCodes.push((action.currencyObject.code).toLowerCase());

    return {
        ...state,
        currenciesObjects: updatedCurrenciesObjects,
        currenciesCodes: updatedCurrenciesCodes
    };
};

const removeCurrency = (state, action) => {
    let updatedCurrenciesObjects, updatedCurrenciesCodes;
    updatedCurrenciesObjects = state.currenciesObjects.filter(el => el.code !== action.currencyObject.code);

    updatedCurrenciesCodes = state.currenciesCodes.filter(el => el !== (action.currencyObject.code).toLowerCase());

    return {
        ...state,
        currenciesObjects: updatedCurrenciesObjects,
        currenciesCodes: updatedCurrenciesCodes
    };
};

const removeAllCurrencies = (state) => {
    return {
        ...state,
        currenciesObjects: [],
        currenciesCodes: []
    };
};

const reducer = (state=initialState, action) => {
    switch ( action.type ) {
        case actionTypes.ADD_CURRENCY:
            return addCurrency(state, action);
        case actionTypes.REMOVE_CURRENCY:
            return removeCurrency(state, action);
        case actionTypes.REMOVE_ALL_CURRENCIES:
            return removeAllCurrencies(state);
        default: return state;
    }
};

export default reducer;