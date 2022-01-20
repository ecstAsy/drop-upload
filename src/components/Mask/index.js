/*
 * @Author: ecstAsy
 * @Date: 2022-01-19 15:40:44
 * @LastEditTime: 2022-01-19 17:33:37
 * @LastEditors: ecstAsy
 */

import { h } from "preact";
import style from "./index.css";

const Mask = ({
  children,
  visible,
  color="rgba(0, 0, 0, .58)"
}) => {
  return visible && (
    <div class={style.mask} style={{background:color}}>
      {children}
    </div>
  )
}
export default Mask