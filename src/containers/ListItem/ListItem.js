import React, { useState } from 'react';

import { connect } from 'react-redux';

import style from './ListItem.module.css';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

const ListItem = props => {
    const [showModal, setShowModal] = useState(false);

    const showModalHandler = () => {
        setShowModal(!showModal);
        props.switchBackdrop();
    };

    const removeCurrency = () => {
        const codes = (props.currenciesCodes).filter(el => el !== props.code.toLowerCase());
        localStorage.setItem("fav", JSON.stringify(codes));
        props.switchBackdrop();
        props.removed();
    }

    return (
        <div className={style.ListItem}>
            <div className={style.Column}>{props.code}</div>
            <div className={style.Column}>{props.currency}</div>
            <div className={style.Column}>{props.rate} PLN</div>
            <div className={style.Column}>
                <Button
                    btnType={'Remove'}
                    clicked={showModalHandler}
                    switchBackdrop={props.switchBackdrop}
                >Remove Currency</Button>
            </div>
            <Modal 
                showModal={showModal}
                removeHandler={removeCurrency}
                showModalHandler={showModalHandler}
            />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currenciesCodes: state.currency.currenciesCodes
    };
};

export default connect(mapStateToProps)(ListItem);