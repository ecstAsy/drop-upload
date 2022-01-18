/*
 * @Author: ecstAsy
 * @Date: 2022-01-18 09:44:51
 * @LastEditTime: 2022-01-18 10:49:35
 * @LastEditors: ecstAsy
 */
import { h } from "preact";
import style from "./index.css";

const ToastModal = ({
  visible,
  url,
  password,
  onConfirm
}) => {
  return visible && (
    <div class={style.modal}>
      <div className={style.body}>
        <div class={style.main}>
          <div class={style.header}>
            温馨提示
          </div>
          <div class={style.content}>
            <p>访问地址：<span>{url}</span></p>
            <p>修改密码：<span>{password}</span></p>
          </div>
          <div class={style.footer}>
            <button class={style.confirm} onClick={onConfirm}>确认</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToastModal