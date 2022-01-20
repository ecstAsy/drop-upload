/*
 * @Author: ecstAsy
 * @Date: 2022-01-18 14:10:54
 * @LastEditTime: 2022-01-19 14:47:08
 * @LastEditors: ecstAsy
 */
import Directory from './directory';
import getTree from './tree';
import Request from './Request';

// 文件格式校验
const FileValidated = files => {
  let valid = false;
  if (files.length === 1 && !(files[0].name.match(/.zip/) || files[0].name.match(/index.htm/))) {
    valid = true;
  } else if (files.length > 1 && !files.find(item => item.name.match(/index.htm/))) {
    valid = true;
  }
  return valid
}
const getCookie = name => {
  const prefix = `${name}=`;
  const start = document.cookie.indexOf(prefix);

  if (start == -1) {
    return null;
  }

  let end = document.cookie.indexOf(";", start + prefix.length);
  if (end == -1) {
    end = document.cookie.length;
  }

  const value = document.cookie.substring(start + prefix.length, end);
  return value;
}
export {
  Directory,
  getTree,
  Request,
  FileValidated,
  getCookie
}