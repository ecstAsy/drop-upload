/*
 * @Author: ecstAsy
 * @Date: 2022-01-06 16:58:12
 * @LastEditTime: 2022-01-17 17:52:45
 * @LastEditors: ecstAsy
 */

function toArray(list) {
  return Array.prototype.slice.call(list || [], 0);
}

function errorHandler(e) {
  console.log(`FileSystem API error code: ${e.code}`);
}
class Directory {
  constructor() {
    this.value = [];
  }
  // 赋值
  setValue(vs) {
    this.value = [...this.value, ...vs];
  }
  // 取值
  getValue() {
    return new Promise((resolve) => setTimeout(() => resolve(this.value), 500));
  }
  // 读取文件夹内容
  readDirectory(entires) {
    this.setValue(entires);
    entires.map((item) => {
      if (item.isDirectory) {
        let directoryReader = item.createReader();
        this.getAllEntries(directoryReader);
      } else {
        item.file(file => {
           file.fullPath = item.fullPath
           item.content = file;
        })
      }
    });
  }
  getAllEntries(directoryReader) {
    let entries = [];
    let that = this;
    const readEntries = function () {
      directoryReader.readEntries((results) => {
        if (!results.length) {
          entries.sort();
          that.readDirectory(entries);
        } else {
          entries = entries.concat(toArray(results));
          readEntries();
        }
      }, errorHandler);
    };
    readEntries();
  }

  getDirectoryInfo = (entries) => {
    this.setValue(entries);
    entries.map((item) => {
      if (item.isDirectory) {
        console.log(item);
        let directoryReader = item.createReader();
        this.getAllEntries(directoryReader);
      } else {
        item.file(file => {
          file.fullPath = item.fullPath
          item.content = file;
        })
      }
    });

    return this.getValue();
  };
}

export default Directory;
