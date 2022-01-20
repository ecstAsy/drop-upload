/*
 * @Author: ecstAsy
 * @Date: 2022-01-20 10:04:57
 * @LastEditTime: 2022-01-20 14:29:10
 * @LastEditors: ecstAsy
 */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Layout, PageLoading, PageToast, Input } from "../../components";
import { Request } from "../../utils";
import style from "./index.css";

const List = () => {
  const [searchInfo, setSearchInfo] = useState({
    folder: null,
    username: null
  });
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastProps, setToastProps] = useState({
    visible: false,
    message: null,
    onClose: () => setToastProps({ ...toastProps, visible: false, message: null }),
  });
  const getLists = async (type = 'submit') => {
    await setLoading(true);
    const form = new FormData();
    if (type === 'submit') {
      const { folder, username } = searchInfo;
      folder && form.append('folder', folder);
      username && form.append('username', username);
    }
    const res = await Request('api.php?mod=project', {
      method: 'post',
      data: form
    });
    await setLoading(false);
    if (res.code) return setToastProps({ ...toastProps, visible: true, message: res.message });
    return setLists(res.data);
  }
  useEffect(() => {
    getLists();
  }, [])

  const onReset = async () => {
    await setSearchInfo({
      folder: null,
      username: null
    })
    return getLists('reset');
  }

  return (
    <Layout>
      <div class={style.search}>
        <Input
          style={{ width: '200px' }}
          value={searchInfo.folder}
          placeholder="请输入项目名称"
          onChange={e => setSearchInfo({ ...searchInfo, folder: e.target.value })}
        />
        <Input
          style={{ marginLeft: '16px', width: '200px' }}
          value={searchInfo.username}
          placeholder="请输入上传人名字"
          onChange={e => setSearchInfo({ ...searchInfo, username: e.target.value })}
        />
        <button
          class="submit"
          style={{ margin: '0 16px' }}
          onClick={() => getLists()}
        >
          查询
        </button>
        <button
          class="submit default"
          onClick={() => onReset()}
        >
          重置
        </button>
      </div>
      <ul class={style.lists}>
        {
          lists.map((item, i) =>
            <li class={style.list} key={i}>
              <p>
                <span>{item.name}</span>
                <a href={item.url} target="_blank" rel="noreferrer">查看</a>
              </p>
              <p>
                <span>
                  <svg class="icon" width="12" height="12" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-042ca774=""><path fill="currentColor" d="M512 512a192 192 0 100-384 192 192 0 000 384zm0 64a256 256 0 110-512 256 256 0 010 512zm320 320v-96a96 96 0 00-96-96H288a96 96 0 00-96 96v96a32 32 0 11-64 0v-96a160 160 0 01160-160h448a160 160 0 01160 160v96a32 32 0 11-64 0z" /></svg>
                  {item.username}
                </span>
                <span>
                  <svg class="icon" width="12" height="12" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-042ca774=""><path fill="currentColor" d="M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z" /><path fill="currentColor" d="M480 256a32 32 0 0132 32v256a32 32 0 01-64 0V288a32 32 0 0132-32z" /><path fill="currentColor" d="M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z" /></svg>
                  {item.updated_at}
                </span>
              </p>
            </li>
          )}
      </ul>
      <PageLoading visible={loading} />
      <PageToast />
    </Layout>
  )
}

export default List