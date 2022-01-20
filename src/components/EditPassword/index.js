/*
 * @Author: ecstAsy
 * @Date: 2022-01-19 15:37:02
 * @LastEditTime: 2022-01-19 17:47:48
 * @LastEditors: ecstAsy
 */

import { h } from "preact";
import { useState } from "preact/hooks";
import Modal from "../Modal";
import FormItem from "../FormItem";
import Input from "../Input";
import PageToast from "../PageToast";
import { Request } from "../../utils";
import { route } from "preact-router";

const EditPassword = ({
  visible,
  onCancel
}) => {
  const [toastProps, setToastProps] = useState({
    visible: false,
    message: null,
    onClose: () => setToastProps({ ...toastProps, visible: false, message: null }),
  })
  const [info, setInfo] = useState({
    password: null,
    newpassword: null
  })
  const [volid, setVolid] = useState({
    password: false,
    newpassword: false
  })
  const [loading, setLoading] = useState(false);
  const modalProps = {
    visible,
    loading,
    title: '修改密码',
    onOk: async () => {
      const { password, newpassword } = info;
      if (!password || !newpassword) {
        return setVolid({
          password: !(password),
          newpassword: !(newpassword)
        })
      }
      await setLoading(true);
      const form = new FormData();
      form.append('password', password);
      form.append('newpassword', newpassword);
      const res = await Request('/api.php?mod=editpwd', {
        method: 'POST',
        data: form
      });
      await setLoading(false);
      if (res.code) return setToastProps({
        ...toastProps,
        visible: true,
        message: res.message
      });
      return route('/login')
    },
    onCancel: () => Promise.all([
      setInfo({ password: null, newpassword: null }),
      setVolid({ password: false, newpassword: false }),
      onCancel()
    ])
  }
  return (
    <Modal {...modalProps}>
      <FormItem label='旧密码' required message="请输入旧密码!" isVolid={volid.password}>
        <Input
          value={info.password}
          placeholder="请输入旧密码"
          onChange={e => {
            setInfo({ ...info, password: e.target.value });
            e.target.value && setVolid({ ...volid, password: false })
          }}
        />
      </FormItem>
      <FormItem label='新密码' required message="请输入新密码!" isVolid={volid.newpassword}>
        <Input
          value={info.newpassword}
          placeholder="请输入新密码"
          onChange={e => {
            setInfo({ ...info, newpassword: e.target.value });
            e.target.value && setVolid({ ...volid, newpassword: false })
          }}
        />
      </FormItem>
      <PageToast {...toastProps} />
    </Modal>
  )
}

export default EditPassword