/*
 * @Author: ecstAsy
 * @Date: 2022-01-19 16:11:13
 * @LastEditTime: 2022-01-19 16:56:35
 * @LastEditors: ecstAsy
 */

import { h } from "preact";
import style from "./index.css";

const FormItem = ({
  required,
  message,
  isVolid,
  label,
  children
}) => {
  return (
    <div class={style.FormItem}>
      <label>
        <span class={`${required && style.required}`}>{label}</span>
        {children}
      </label>
      <p class={style.error}>{isVolid && message}</p>
    </div>
  )
}

export default FormItem