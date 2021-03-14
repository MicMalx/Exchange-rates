import React, { useState } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import ListItem from '../../containers/ListItem/ListItem';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';

const List = props => {
    const [showModal, setShowModal] = useState(false);

    const showModalHandler = () => {
        setShowModal(!showModal);
        props.switchBackdrop();
    };

    const removeAllHandler = () => {
        props.switchBackdrop();
        setShowModal(!showModal);
        props.onAllCurrenciesRemoved();
        localStorage.removeItem("fav");
    };

    const currenciesListDisplay = (props.currencies).map(listItem => {
        return (
            <ListItem 
                key={listItem.code}
                code={listItem.code}
                currency={listItem.currency}
                rate={listItem.rate}
                switchBackdrop={props.switchBackdrop}
                removed={() => props.onCurrencyRemoved(listItem)}
            />
        );
    });

    return (
        <div>
            {currenciesListDisplay}
            <Modal 
                showModal={showModal}
                removeHandler={removeAllHandler}
                showModalHandler={showModalHandler}
            />
            {props.currencies.length ? <Button
                btnType={"Remove"}
                clicked={showModalHandler}
            >Remove all currencies</Button> : null} 
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currencies: state.currency.currenciesObjects
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCurrencyRemoved: (name) => dispatch(actions.removeCurrency(name)),
        onAllCurrenciesRemoved: () => dispatch(actions.removeAllCurrencies())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);