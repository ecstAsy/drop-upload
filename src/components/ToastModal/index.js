/*
 * @Author: ecstAsy
 * @Date: 2022-01-18 09:44:51
 * @LastEditTime: 2022-01-19 17:28:39
 * @LastEditors: ecstAsy
 */
import { h } from "preact";
import Modal from "../Modal";
import style from "./index.css";

const ToastModal = ({
  visible,
  url,
  onConfirm
}) => {

  const modalProps = {
    visible,
    title: '温馨提示',
    confirmTxt: '查看',
    cancelTxt: "关闭",
    onOk: () => window.open(url, "_blank"),
    onCancel: () => onConfirm()
  }

  return (
    <Modal {...modalProps}>
      <div class={style.content}>
        <i class="icon icon-upload-success" />
        <p>访问地址：<span>{url}</span></p>
      </div>
    </Modal>
  )
}

export default ToastModal