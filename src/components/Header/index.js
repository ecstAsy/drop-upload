/*
 * @Author: ecstAsy
 * @Date: 2022-01-20 10:31:56
 * @LastEditTime: 2022-01-20 15:05:48
 * @LastEditors: ecstAsy
 */
import { h } from "preact";
import { useState } from "preact/hooks";
import { Request } from "../../utils";
import { removeItem,getItem } from "../../utils/localstorge";
import { PageLoading, PageToast } from "../../components";
import style from "./index.css";

import EditPassword from "../EditPassword";
import { route } from "preact-router";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [editpwdVisible, setEditpwdVisible] = useState(false);
  const [toastProps, setToastProps] = useState({
    visible: false,
    message: null,
    onClose: () => setToastProps({ ...toastProps, visible: false, message: null }),
  });
  const editpwdProps = {
    visible: editpwdVisible,
    onCancel: () => setEditpwdVisible(false)
  }
  const onLogut = async () => {
    await setLoading(true);
    const res = await Request('/api.php?mod=logout', {
      method:'POST'
    })
    await setLoading(false);
    if (res.code) return setToastProps({ ...toastProps, visible: true, message: res.message });
    return Promise.all([
      removeItem('username'),
      route('/login')
    ]);
  }
  return (
    <div class={style.Header}>
      <div class={style.Avator}>
        <svg class="icon" width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-042ca774=""><path fill="currentColor" d="M288 320a224 224 0 10448 0 224 224 0 10-448 0zm544 608H160a32 32 0 01-32-32v-96a160 160 0 01160-160h448a160 160 0 01160 160v96a32 32 0 01-32 32z" /></svg>
        <span>{getItem('username')}</span>
        <ul class={style.AvatorAction}>
          <li onClick={() => setEditpwdVisible(true)}>
            <i class="icon icon-edit-password" />修改密码
          </li>
          <li onClick={() => onLogut()}>
            <i class="icon icon-exit" />退出登录
          </li>
        </ul>
      </div>
      <EditPassword {...editpwdProps} />
      <PageLoading visible={loading} />
      <PageToast {...toastProps} />
    </div>
  )
}

export default Header