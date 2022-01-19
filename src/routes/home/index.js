import { h } from "preact";
import { useState } from "preact/hooks";
import { Directory, getTree, Request, FileValidated } from '../../utils';
import { ToastModal, PageLoading, PageToast, DirectoryTree } from '../../components';
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

  const onSubmit = async () => {
    if (!value.length) {
      return setToastProps({ ...toastProps, visible: true, message: '请选择要上传的文件！' })
    }
    await setLoading(true);
    const form = new FormData();
    dirs.length && form.append('dir', dirs);
    password && form.append('password', password);
    for (let i = 0; i < value.length; i++) {
      form.append(`file[${value[i].fullPath}]`, value[i])
    }
    
    const res = await Request('/api.php', {
      method: 'POST',
      data: form
    });
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
    const valid = FileValidated(Object.values(fileList));
    if (valid) return setIsError(true);
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
      setDirs([])
    ])
    const length = e.dataTransfer.items.length;
    let entries = [];
    for (let i = 0; i < length; i++) {
      entries = [...entries, e.dataTransfer.items[i].webkitGetAsEntry()];
    }
    const directories = await drop.getDirectoryInfo(entries);
    const valid = FileValidated(directories);
    if (valid) return setIsError(true);
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
    return setTrees(data);
  }

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
          {!value.length ? <p class={style.toast}> <span>将文件拖到此处上传</span> </p> : <DirectoryTree trees={trees} />}
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
          <span>修改密码：</span> <input value={password} placeholder="请输入修改密码" onBlur={e => setPassword(e.target.value)} />
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
