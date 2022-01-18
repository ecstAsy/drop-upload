import { h } from "preact";
import { useState } from "preact/hooks";
import Directory from "../../utils/directory";
import getTree from "../../utils/tree";
import ToastModal from "../../components/ToastModal";
import PageLoading from "../../components/PageLoading";
import PageToast from "../../components/PageToast";
import style from "./style.css";

const Home = () => {
  const [value, setValue] = useState([]);
  const [isDrop, setIsDrop] = useState(false);
  const [isError, setIsError] = useState(false);
  const [dirs, setDirs] = useState([]);
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [modalProps, setModalProps] = useState({
    visible: false,
    url: null,
    password: null,
    onConfirm: () => Promise.all([
      setModalProps({
        ...modalProps,
        visible: false,
        url: null,
        password: null,
      }),
      setValue([]),
      setTrees([]),
      setDirs([]),
      setPassword(null)
    ])
  });
  const [toastProps, setToastProps] = useState({
    visible: false,
    message: null,
    onClose: () => setToastProps({ ...toastProps, visible: false, message: null }),
  })
  const drop = new Directory();

  const Request = (url, data) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'post',
        body: data
      })
        .then(response => resolve(response.json()))
        .catch((error) => {
          reject(error)
        });
    })
  }

  const onSubmit = async () => {
    if (!value.length) {
      return setToastProps({ ...toastProps, visible: true, message: '请选择要上传的文件！' })
    }
    await setLoading(true);
    const form = new FormData();
    for (let i = 0; i < value.length; i++) {
      form.append(`file[${value[i].fullPath}]`, value[i])
    }
    if (dirs.length) {
      form.append('dir', dirs);
    }
    form.append('password', password);
    const res = await Request('/index.php', form);
    await setLoading(false);
    if (res.code) {
      return setToastProps({ ...toastProps, visible: true, message: res.message })
    }
    return setModalProps({
      ...modalProps,
      visible: true,
      ...res.data
    })
  };
  const onChange = (e) => {
    const fileList = e.target.files;
    getFileTree(Object.values(fileList), 'change');
    if (Object.values(fileList).length === 1 && !(Object.values(fileList)[0].name.match(/.zip/) || Object.values(fileList)[0].name.match(/index.htm/))) {
      return setIsError(true);
    } else if (Object.values(fileList).length > 1 && !Object.values(fileList).find(item => item.name.match(/index.htm/))) {
      return setIsError(true);
    }
    return Promise.all([
      setDirs([]),
      setValue(e.target.files),
      setIsError(false)
    ]);
  };
  const onDrop = async (e) => {
    await Promise.all([
      e.preventDefault(),
      setIsError(false),
      setValue([]),
      setTrees([]),
      setDirs([]),
      setPassword(null)
    ])
    const length = e.dataTransfer.items.length;
    let entries = [];
    for (let i = 0; i < length; i++) {
      entries = [...entries, e.dataTransfer.items[i].webkitGetAsEntry()];
    }
    const directories = await drop.getDirectoryInfo(entries);
    if (directories.length === 1 && !(directories[0].name.match(/.zip/) || directories[0].name.match(/index.htm/))) {
      return setIsError(true);
    } else if (directories.length > 1 && !directories.find(item => item.name.match(/index.htm/))) {
      return setIsError(true);
    }
    getFileTree(directories, 'drop');
    let vs = [];
    let ds = [];
    directories.map(item => {
      if (item.isFile) {
        vs = [...vs, item.content];
      } else {
        ds = [...ds, item.fullPath];
      }
    })
    return Promise.all([
      setDirs(ds),
      setValue(vs),
      setIsError(false)
    ]);
  };
  const openFile = () => {
    document.getElementById("upload-input").click();
  };
  const getFileTree = (values, type) => {
    const data = getTree(values, type);
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
          {!value.length ? <p> <span>将文件拖到此处上传</span> </p> : <DirectoryTree />}
          <input
            class={style.input}
            value={value}
            id="upload-input"
            type="file"
            accept="*"
            multiple
            onChange={onChange}
            webkitdirectory={isDrop}
            mozdirectort={isDrop}
          />
        </div>
        <div class={style.error}>
          <span> {isError && `请上传正确的文件类型！`} </span>
        </div>
        <label>
          <span>修改密码：</span> <input placeholder="请输入修改密码" onChange={e => setPassword(e.target.value)} />
        </label>
      </form>
      <button class={style.submit} onClick={onSubmit}>
        提交
      </button>
      <ToastModal {...modalProps} />
      <PageLoading visible={loading} />
      <PageToast {...toastProps} />
    </div>
  );
};

export default Home;
