/*
 * @Author: ecstAsy
 * @Date: 2022-01-19 15:43:41
 * @LastEditTime: 2022-01-19 17:47:21
 * @LastEditors: ecstAsy
 */
import { h } from "preact";
import Mask from "../Mask";
import Loading from "../Loading";
import style from "./index.css";

const Modal = ({
  visible,
  loading = false,
  width,
  title="提示",
  footer,
  children,
  confirmTxt = '确认',
  cancelTxt = "取消",
  onCancel,
  onOk
}) => {
  return (
    <Mask visible={visible}>
      <div class={style.main}>
        <div class={style.modal} style={{ width: `${width || 500}px` }}>
          <header>
            {title}
          </header>
          <div class={style.body}>
            {children}
          </div>
          <footer>
            {
              footer ||
              <div>
                  <button
                    class={`${style.button} ${style.cancel}`}
                    onClick={onCancel}
                  >
                    {cancelTxt}
                  </button>
                  <button
                    class={`${style.button} ${style.confirm}`}
                    onClick={onOk}
                  >
                    {confirmTxt}
                  </button>
              </div>
            }
          </footer>
        </div>
      </div>
      {
        loading && <Loading />
      }
    </Mask>
  )
}

export default Modal