/*
 * @Author: ecstAsy
 * @Date: 2022-01-19 10:35:04
 * @LastEditTime: 2022-01-20 15:02:29
 * @LastEditors: ecstAsy
 */
import { h } from "preact";
import { route } from "preact-router";
import { useState } from "preact/hooks";
import { Request } from "../../utils";
import { setItem } from "../../utils/localstorge";
import { PageLoading, PageToast } from "../../components";
import style from "./index.css";

const Login = () => {

  const [loginInfo, setLoginInfo] = useState({
    username: null,
    password: null
  })
  const [loading, setLoading] = useState(false);
  const [toastProps, setToastProps] = useState({
    visible: false,
    message: null,
    onClose: () => setToastProps({ ...toastProps, visible: false, message: null }),
  })

  const onLogin = async () => {
    if (!loginInfo.username || !loginInfo.password) return setToastProps({
      ...toastProps,
      visible: true,
      message: '账号或密码未输入！'
    })
    await setLoading(true);
    const form = new FormData();
    form.append('username', loginInfo.username);
    form.append('password', loginInfo.password);
    const res=await  Request('/api.php?mod=login', {
        method: 'POST',
        data: form
    });
    await setLoading(false);
    if (res.code) return setToastProps({
      ...toastProps,
      visible: true,
      message: res.message
    });
    return Promise.all([
      setItem('username', loginInfo.username),
      route('/')
    ]);
  }

  return (
    <div class={style.login}>
      <div class={style.content}>
        <img src="favicon.ico" />
        <h3>HtmlHub</h3>
        <form>
          <p>
            <label>
              <span>账户：</span>
              <input
                value={loginInfo.username}
                placeholder="请输入账号"
                onBlur={e => setLoginInfo({ ...loginInfo, username: e.target.value })}
              />
            </label>
          </p>
          <p>
            <label>
              <span>密码：</span>
              <input
                value={loginInfo.password}
                placeholder="请输入密码"
                type="password"
                onBlur={e => setLoginInfo({ ...loginInfo, password: e.target.value })}
              />
            </label>
          </p>
          
        </form>
        <button class="submit" onClick={onLogin}>
            登录
        </button>
      </div>
      <PageLoading visible={loading} />
      <PageToast {...toastProps} />
    </div>
  )
}

export default Login