/*
 * @Author: ecstAsy
 * @Date: 2022-01-19 17:29:01
 * @LastEditTime: 2022-01-19 17:40:15
 * @LastEditors: ecstAsy
 */
import { h } from "preact";
import style from "./index.css";

const Loading = () => {
  return (
    <div class={style.box}>
      <div class={style.ring} />
    </div>
  )
}

export default Loading