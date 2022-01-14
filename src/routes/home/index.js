import {  h } from "preact";
import { useState, useEffect } from "preact/hooks";
import Directory from "../../utils/directory";
import getTree from "../../utils/tree";
import style from "./style.css";

const Home = () => {
  const [value, setValue] = useState([
    {
      fullPath: "/demo-1",
      isDirectory: true,
      isFile: false,
      name: "demo-1",
    },
    {
      fullPath: "/demo-1/AutoTable",
      isDirectory: true,
      isFile: false,
      name: "AutoTable",
    },
    {
      fullPath: "/demo-1/1.jpg",
      isDirectory: false,
      isFile: true,
      name: "1.jpg",
    },
    {
      fullPath: "/demo-1/index.html",
      isDirectory: false,
      isFile: true,
      name: "index.html",
    },
    {
      fullPath: "/demo-1/AutoTable/dd",
      isDirectory: true,
      isFile: false,
      name: "dd",
    },
    {
      fullPath: "/demo-1/AutoTable/www.html",
      isDirectory: false,
      isFile: true,
      name: "www.html",
    }, {
      fullPath: "/demo-2",
      isDirectory: true,
      isFile: false,
      name: "demo-2",
    },
    {
      fullPath: "/demo-2/AutoTable",
      isDirectory: true,
      isFile: false,
      name: "AutoTable",
    },
    {
      fullPath: "/demo-2/1.jpg",
      isDirectory: false,
      isFile: true,
      name: "1.jpg",
    },
    {
      fullPath: "/demo-2/index.html",
      isDirectory: false,
      isFile: true,
      name: "index.html",
    },
    {
      fullPath: "/demo-2/AutoTable/dd",
      isDirectory: true,
      isFile: false,
      name: "dd",
    },
    {
      fullPath: "/demo-2/AutoTable/www.html",
      isDirectory: false,
      isFile: true,
      name: "www.html",
    }, {
      fullPath: "/www.html",
      isDirectory: false,
      isFile: true,
      name: "www.html",
    },
  ]);
  const [isDrop, setIsDrop] = useState(false);
  const [isError, setIsError] = useState(false);
  const [trees, setTrees] = useState([]);
  const drop = new Directory();
  const onSubmit = () => {
    console.log(value);
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

    return setValue(directories);
  };
  const openFile = () => {
    document.getElementById("upload-input").click();
  };

  const getFileTree = () => {
    const data = getTree(value);
    console.log(data);
    setTrees(data)
  }

  useEffect(() => {
    getFileTree();
  }, [])

  const TreeItem = ({ row }) => {
    if (row.children) {
      return (
        <li>
          <span>{row.name}</span>
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
        <span>{row.name}</span>
      </li>
    )
  }

  const DirectoryTree = () => {
    console.log(trees);
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
