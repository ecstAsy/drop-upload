/*
 * @Author: ecstAsy
 * @Date: 2022-01-18 11:10:40
 * @LastEditTime: 2022-01-18 11:20:29
 * @LastEditors: ecstAsy
 */

import { h } from "preact";
import style from "./index.css";

const PageLoading = ({visible}) => {
  return visible && (
    <div class={style.mask}>
      <div class={style.ring} />
    </div>
  )
}

export default PageLoading