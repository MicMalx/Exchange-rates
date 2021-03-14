import React from 'react';

import style from './Button.module.css';

const button = props => (
    <button
      className={style[props.btnType]}
      onClick={props.clicked}
    >{props.children}</button>
);

export default button;