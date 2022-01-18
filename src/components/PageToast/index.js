/*
 * @Author: ecstAsy
 * @Date: 2022-01-18 11:24:33
 * @LastEditTime: 2022-01-18 11:48:52
 * @LastEditors: ecstAsy
 */

import { h } from "preact";
import style from "./index.css";

const PageToast = ({ visible, message, onClose }) => {
  visible && setTimeout(() => {
    onClose()
  },3000)
  return visible && (
    <div class={style.mask}>
      <div class={style.content}>
        <i class='icon icon-error' />
        {message}
      </div>
    </div>
  )
}

export default PageToast