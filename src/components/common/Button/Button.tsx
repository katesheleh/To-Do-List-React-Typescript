import React from "react";
import styles from './style.module.css';

type PropsType = {
  value: string
}

const Button = (props: PropsType) => {
    return <input type="button" value={props.value} className={styles.button}/>
}

export default Button;
