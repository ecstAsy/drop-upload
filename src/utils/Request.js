/*
 * @Author: ecstAsy
 * @Date: 2022-01-18 14:23:54
 * @LastEditTime: 2022-01-18 14:49:06
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
        resolve(res)
      })
      .catch(error => reject(error))
  })
}

export default Request