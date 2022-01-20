/*
 * @Author: ecstAsy
 * @Date: 2022-01-19 16:09:48
 * @LastEditTime: 2022-01-20 13:17:47
 * @LastEditors: ecstAsy
 */
import { h } from "preact";
import styles from "./index.css";

const Input = ({
  placeholder,
  value,
  onBlur,
  onChange,
  style
}) => {
  return (
    <input
      style={{...style}}
      value={value}
      class={styles.Input}
      placeholder={placeholder}
      onBlur={e => onBlur ? onBlur(e) : false}
      onChange={e => onChange ? onChange(e) : false}
    />
  )
}

export default Input