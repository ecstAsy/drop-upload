import { route } from "preact-router";
import { removeItem } from "./localstorge";

/*
 * @Author: ecstAsy
 * @Date: 2022-01-18 14:23:54
 * @LastEditTime: 2022-01-20 15:03:20
 * @LastEditors: ecstAsy
 */
const Request = (url, params) => {
  const { method, data } = params;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method || 'GET',
      body: data,
    })
      .then(response => response.json())
      .then(res => {
        if (res.code === 40010) return Promise.all([
          removeItem('username'),
          route('/login')
        ]);
        resolve(res)
      })
      .catch(error => reject(error))
  })
}

export default Request