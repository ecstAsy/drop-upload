/*
 * @Author: ecstAsy
 * @Date: 2022-01-13 15:45:41
 * @LastEditTime: 2022-01-14 10:58:50
 * @LastEditors: ecstAsy
 */

const Videos = [
  'wmv', 'asf', 'asx', 'rm', 'rmvb', 'mp4', '3gp', 'mov', 'm4v', 'avi', 'dat', 'mkv', 'flv', 'vob'
];
const Images = [
  'png', 'jpg', 'jpeg'
]

const findParent = (values) => {
  values.map((item) => {
    let parent = item.fullPath.split('/');
    parent.pop();
    item.parent = parent.join('/') || '/';
    if (item.isDirectory) {
      item.children = []
      item.icon = 'file'
    } else {
      let itp = item.name.split('.').pop();
      if (Videos.includes(itp)) {
        itp = 'video'
      } else if (Images.includes(itp)) {
        itp = 'img'
      }
      item.icon = itp
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
  let root = [{ name: '/', fullPath: '/', children: [], icon: 'file' }]
  findParent(values)
  findChildren(root, values)
  return root
}


export default getTree