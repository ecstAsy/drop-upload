/*
 * @Author: ecstAsy
 * @Date: 2022-01-20 10:29:24
 * @LastEditTime: 2022-01-20 11:11:13
 * @LastEditors: ecstAsy
 */
import { h } from "preact";
import { Link } from 'preact-router/match';
import style from "./index.css";

const Slider = () => {
  return (
    <ul class={style.Slider}>
      <li>
        <img src="../../assets/favicon.ico" />
      </li>
      <li>
        <Link class={style.Link} activeClassName={style.Active} href="/">
          <svg class="icon" width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-042ca774=""><path fill="currentColor" d="M512 128L128 447.936V896h255.936V640H640v256h255.936V447.936z" /></svg>
        </Link>
      </li>
      <li>
        <Link class={style.Link} activeClassName={style.Active} href="/list">
          <svg class="icon" width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-042ca774=""><path fill="currentColor" d="M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z" /></svg>
        </Link>
      </li>
    </ul>
  )
}

export default Slider