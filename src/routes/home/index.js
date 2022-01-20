import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Directory, getTree, Request, FileValidated, getCookie } from '../../utils';
import { ToastModal, PageLoading, PageToast, DirectoryTree, Layout, FormItem, Input } from '../../components';
import style from "./style.css";
import { route } from "preact-router";

const Home = () => {
  const [modeLists, setModeLists] = useState([]);
  const [value, setValue] = useState([]);
  const [isDrop, setIsDrop] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasName, setHasName] = useState(true);
  const [dirs, setDirs] = useState([]);
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [modalProps, setModalProps] = useState({
    visible: false,
    url: null,
    onConfirm: () => Promise.all([
      setModalProps({
        ...modalProps,
        visible: false,
        url: null,
      }),
      setValue([]),
      setTrees([]),
      setDirs([]),
      setPassword(null),
      setName(null),
      getLists()
    ])
  });
  const [toastProps, setToastProps] = useState({
    visible: false,
    message: null,
    onClose: () => setToastProps({ ...toastProps, visible: false, message: null }),
  });

  const drop = new Directory();

  const onSubmit = async () => {
    if (!value.length) {
      return setToastProps({ ...toastProps, visible: true, message: '请选择要上传的文件！' })
    }
    if (!name) return setHasName(false);
    await setLoading(true);
    const form = new FormData();
    dirs.length && form.append('dir', dirs);
    Password && form.append('password', Password);
    name && form.append('name', name);
    for (let i = 0; i < value.length; i++) {
      form.append(`file[${value[i].fullPath || i}]`, value[i])
    }
    const res = await Request('/api.php', {
      method: 'POST',
      data: form
    });
    await setLoading(false);
    if (res.code) return setToastProps({ ...toastProps, visible: true, message: res.message })
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

  const onRadio = ({ password, name }) => {
    if (Password === password) {
      return Promise.all([
        setPassword(null),
        setName(null)
      ])
    }
    return Promise.all([
      setPassword(password),
      setName(name)
    ])
  }

  const onDelete = async ({ id }) => {
    await setLoading(true);
    const form = new FormData();
    form.append('id', id);
    const res = await Request('/api.php?mod=delete', {
      method: 'POST',
      data: form
    });
    await setLoading(false);
    if (res.code) return setToastProps({ ...toastProps, visible: true, message: res.message });
    return getLists();
  }

  const getFileTree = (values, type) => {
    const data = getTree(values, type);
    return setTrees(data);
  }

  const getLists = async () => {
    await setLoading(true);
    const res = await Request('/api.php?mod=list', { method: 'post' });
    await setLoading(false);
    if (res.code) return setToastProps({ ...toastProps, visible: true, message: res.message });
    return setModeLists(res.data);
  }

  useEffect(() => {
    const cookie = getCookie('htmlhub');
    if (!cookie) return route('/login');
    getLists();
  }, [])

  return (
    <Layout>
      <div class={style.home}>
        <div class={style.left}>
          <h3>项目记录</h3>
          <ul>
            {
              modeLists.map(item => (
                <li key={item.password} class={`${item.password === Password ? style.liActive : ''}`}>
                  <div onClick={() => onRadio(item)}>
                    <input type="radio" value={item.password} checked={item.password === Password} />
                    <i class="icon icon-file" />
                    <span>{item.name}</span>
                  </div>
                  <div class={style.action}>
                    <a href={item.url} target="_blank" rel="noreferrer">查看</a>
                    <a style={{ color: '#ff4d4f' }} onClick={() => onDelete(item)}>删除</a>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
        <div class={style.right}>
          <div class={style.content}>
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
              <FormItem label="文件名称" required message="请输入文件名称！" isVolid={!hasName}>
                <Input
                  placeholder="请输入文件名称"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                    e.target.value && setHasName(true);
                  }}
                />
              </FormItem>
            </form>
            <button class='submit' onClick={onSubmit}>
              提交
            </button>
          </div>
        </div>
        <ToastModal {...modalProps} />
        <PageLoading visible={loading} />
        <PageToast {...toastProps} />
      </div>
    </Layout>
  );
};

export default Home;
