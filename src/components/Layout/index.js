/*
 * @Author: ecstAsy
 * @Date: 2022-01-20 10:16:25
 * @LastEditTime: 2022-01-20 11:00:48
 * @LastEditors: ecstAsy
 */
import { h } from "preact";
import style from "./index.css";
import Slider from "../Slider";
import Header from "../Header";

const Layout = ({
  children
}) => {
  return (
    <div class={style.Layout}>
      <Slider />
      <div class={style.LayoutMain}>
        <Header />
        <div class={style.LayoutContent}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout