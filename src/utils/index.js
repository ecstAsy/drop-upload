/*
 * @Author: ecstAsy
 * @Date: 2022-01-18 14:10:54
 * @LastEditTime: 2022-01-18 14:29:23
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

export {
  Directory,
  getTree,
  Request,
  FileValidated
}