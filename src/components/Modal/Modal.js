import React from 'react';

import style from './Modal.module.css';
import Button from '../Button/Button';

const modal = props => {
    return (
        <div className={style.Modal}
        style={{
            transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)', opacity: props.showModal ? '1': '0'
        }}>
            <div>Are You sure You want to remove all currencies from the watchlist?</div>
            <Button
                btnType={'Remove'}
                clicked={props.removeHandler}
            >Yes, remove it</Button>
            <Button
                btnType={'Submit'}
                clicked={props.showModalHandler}
            >No</Button>
        </div>
    );
}

export default modal;