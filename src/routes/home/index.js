import {  h } from "preact";
import { useState, useEffect } from "preact/hooks";
import Directory from "../../utils/directory";
import Request from "../../utils/ajax";
import getTree from "../../utils/tree";
import style from "./style.css";

const Home = () => {
  const [value, setValue] = useState([]);
  const [isDrop, setIsDrop] = useState(false);
  const [isError, setIsError] = useState(false);
  const [trees, setTrees] = useState([]);
  const drop = new Directory();
  const onSubmit = () => {
    console.log(value);
    const form = new FormData();
    value.map(file => form.append('files',file))
    Request({
      url: 'http://172.16.0.139:8080',
      fileList:form
    })
  };
  const onChange = (e) => {
    return setValue(e.target.files);
  };
  const onDrop = async (e) => {
    e.preventDefault();
    const length = e.dataTransfer.items.length;
    let entries = [];
    for (let i = 0; i < length; i++) {
      entries = [...entries, e.dataTransfer.items[i].webkitGetAsEntry()];
    }
    const directories = await drop.getDirectoryInfo(entries);
    console.log(directories);
    // if (directories.length > 1 && !directories.find(item => item.name.match(/.html/))) {
    //   return setIsError(true);
    // } else if (!directories[0].name.match(/.zip/)) {
    //   return setIsError(true);
    // }
    getFileTree(directories);
    return setValue(directories);
  };
  const openFile = () => {
    document.getElementById("upload-input").click();
  };

  const getFileTree = (values) => {
    const data = getTree(values);
    console.log(data);
    setTrees(data)
  }

  const TreeItem = ({ row }) => {
    if (row.children) {
      return (
        <li>
          <p>
            <i class={`icon icon-${row.icon}`} />
            <span>{row.name}</span>
          </p>
          <ul>
            {
              row.children.map(item => <TreeItem key={item.fullPath} row={item} />)
            }
          </ul>
        </li>
      )
    }
    return (
      <li>
        <p>
            <i class={`icon icon-${row.icon}`} />
            <span>{row.name}</span>
          </p>
      </li>
    )
  }

  const DirectoryTree = () => {
    return (
      <ul class={style.DirectoryTree}>
        {
          trees.map(item => <TreeItem key={item.fullPath} row={item} />)
        }
      </ul>
    );
  };

  return (
    <div class={style.home}>
      <h3> 文件上传 </h3>
      <form class={style.form}>
        <div
          class={style.upload}
          onClick={openFile}
          onDrop={(e) => onDrop(e)}
          onDragover={(e) => {
            e.preventDefault();
            setIsDrop(false);
          }}
          onDragStart={(e) => {
            e.preventDefault();
            setIsDrop(true);
          }}
        >
          {!value.length ? <p> 将文件拖到此处上传 </p> : <DirectoryTree />}
          <input
            class={style.input}
            value={value}
            id="upload-input"
            type="file"
            accept="*"
            onChange={onChange}
            webkitdirectory={isDrop}
            mozdirectort={isDrop}
          />
        </div>
        <div class={style.error}>
          <span> {isError && `请上传正确的文件类型！`} </span>
        </div>
      </form>
      <button class={style.submit} onClick={onSubmit}>
        提交
      </button>
    </div>
  );
};

export default Home;
