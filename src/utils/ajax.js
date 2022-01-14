/*
 * @Author: ecstAsy
 * @Date: 2022-01-14 11:34:42
 * @LastEditTime: 2022-01-14 11:45:24
 * @LastEditors: ecstAsy
 */
const Request = (params) => {
  const { url, file } = params;
  const xhr = new XMLHttpRequest();
  xhr.open("post", url, true);
  xhr.send(file)
}

export default Request