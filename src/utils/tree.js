/*
 * @Author: ecstAsy
 * @Date: 2022-01-13 15:45:41
 * @LastEditTime: 2022-01-17 17:32:25
 * @LastEditors: ecstAsy
 */

const Videos = [
  'wmv', 'asf', 'asx', 'rm', 'rmvb', 'mp4', '3gp', 'mov', 'm4v', 'avi', 'dat', 'mkv', 'flv', 'vob'
];
const Images = [
  'png', 'jpg', 'jpeg'
]
const Icons = [
  'vue','sass','scss','css','jsx','md','js','json','svg','excel','file','word','ppt','music','html','video','img','zip','gif','exe','pdf','txt','wps'
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
      } else if (itp.match(/htm/)){
        itp = 'html'
      } 
      item.icon = Icons.includes(itp) ? itp : 'default'
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

const findType = values => {
  values.map((item) => {
    if (item.isDirectory) {
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

const getTree = (values, type) => {
  if (!values || !values.length) {
    return false
  }
  let root = [{ name: '/', fullPath: '/', children: [], icon: 'file' }]
  if (type === 'drop') {
    findParent(values)
    findChildren(root, values)
  } else {
    findType(values);
    root[0].children = values;
  }

  return root
}


export default getTree