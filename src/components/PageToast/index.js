/*
 * @Author: ecstAsy
 * @Date: 2022-01-18 11:24:33
 * @LastEditTime: 2022-01-19 13:05:45
 * @LastEditors: ecstAsy
 */

import { h } from "preact";
import style from "./index.css";

const PageToast = ({ visible, message, onClose }) => {
  visible && setTimeout(() => {
    onClose()
  }, 3000)
  return visible && (
    <div class={style.mask}>
      <div class={style.content}>
        <span>
          <i class='icon icon-error' />
          { message }
        </span>
      </div>
    </div>
  )
}

export default PageToast