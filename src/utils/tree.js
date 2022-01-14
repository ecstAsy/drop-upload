/*
 * @Author: ecstAsy
 * @Date: 2022-01-13 15:45:41
 * @LastEditTime: 2022-01-14 09:12:57
 * @LastEditors: ecstAsy
 */

const findParent = (values) => {
  values.map((item) => {
    let parent = item.fullPath.split('/');
    parent.pop();
    item.parent = parent.join('/') || '/';
    if (item.isDirectory) {
      item.children = []
    }
  })
}

const findChildren = (roots, values) => {
  roots.map(item => {
    if (item.children) {
      item.children = values.filter(file => file.parent === item.fullPath);
      findChildren(item.children, values);
    }
  })
}

const getTree = (values) => {
  if (!values || !values.length) {
    return false
  }
  let root = [{name:'root',fullPath:'/',children:[]}]
  findParent(values)
  findChildren(root, values)
  return root
}


export default getTree