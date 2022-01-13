/*
 * @Author: ecstAsy
 * @Date: 2022-01-06 10:28:32
 * @LastEditTime: 2022-01-06 11:13:26
 * @LastEditors: ecstAsy
 */
// Recursive directory read 


const imageTypes = ['image/png', 'image/jpeg', 'image/gif']

function readDirectory(entries, parentNode) {
  console.log(entries);
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].isDirectory) {
 
            appendItem(entries[i].name, 'folder', parentNode);
            let directoryReader = entries[i].createReader();
            getAllEntries(
                    directoryReader,
                    readDirectory,
                    appendIndentList(parentNode)
                );
 
        } else {
            appendItem(entries[i].name, 'file', parentNode);
            entries[i].file(appendFile, errorHandler);
        }
    }
}
 
 
function appendFile(file) {
  console.log(`file:`,file);
    if (file.type === 'text/plain')
        appendTextFile(file);
 
    if (imageTypes.indexOf(file.type) > -1)
        appendImageFile(file);
}
 
 
function appendImageFile(file) {
  console.log(file);
    appendContainer();
    let fileReader = new FileReader();
    fileReader.onload = function (e) {
        let node = document.getElementById('tree-box-content');
      let img = document.createElement('img');
      console.log(e.target.result);
        img.setAttribute('src', e.target.result);
        node.appendChild(img);
    };
    fileReader.readAsDataURL(file);
}
 
 
function appendTextFile(file) {
    appendContainer();
    let reader = new FileReader();
    reader.onload = function (e) {
        let node = document.getElementById('tree-box-content');
        let div = document.createElement('div');
        node.appendChild(document.createTextNode(e.target.result));
        node.appendChild(div);
    };
    reader.readAsText(file);
}
 
 
 
// This is needed to get all directory entries as one 
// call of readEntries may not return all items. Works a 
// bit like stream reader.  
function getAllEntries(directoryReader, callback, parentNode) {
    let entries = [];
 
    const readEntries = function () {
        directoryReader.readEntries((results) => {
            if (!results.length) {
                entries.sort();
                callback(entries, parentNode);
            } else {
                entries = entries.concat(toArray(results));
                readEntries();
            }
        }, errorHandler);
    };
 
    readEntries();
}
 
 
function toArray(list) {
    return Array.prototype.slice.call(list || [], 0);
}
 
function errorHandler(e) {
    console.log(`FileSystem API error code: ${  e.code}`)
}
 
 
 
// DOM stuff for appending HTML into page
// --------------------------------------
 
function clearLog() {
    empty(document.getElementById('tree-box-list'));
    let container = document.getElementById('tree-box-content')
    if (container)
        container.parentNode.removeChild(container);
}
 
function empty(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
 
function appendStr(str) {
    let log = document.getElementById('tree-box-list');
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(str))
    log.appendChild(li);
}
 
function appendItem(name, type, parentNode) {
  let li = document.createElement('li'); 
  console.log(name,type);
    li.innerHTML = `<img src="../images/${  type  }.png" />${  name}`;
    parentNode.appendChild(li);
}
 
function appendIndentList(parentNode) {
    let li = document.createElement('li');
    let ul = document.createElement('ul');
    parentNode.appendChild(li);
    li.appendChild(ul);
    return ul;
}
 
function appendContainer() {
    if (!document.getElementById('tree-box-content')) {
        let div = document.createElement('div');
        div.setAttribute('id', 'tree-box-content');
        document.getElementById('tree-box').appendChild(div);
    }
}

export {
  readDirectory,
  clearLog,
  appendStr
}