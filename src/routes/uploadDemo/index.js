/*
 * @Author: ecstAsy
 * @Date: 2022-01-10 13:48:52
 * @LastEditTime: 2022-01-10 15:05:37
 * @LastEditors: ecstAsy
 */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import Uploader from "simple-uploader.js";
import style from "./index.css";

const UploadDemo = () => {
  let uploader = new Uploader({
    target: "/api/photo/redeem-upload-token",
    query: { upload_token: "my_token" },
  });
  useEffect(() => {
    uploader.assignBrowse(document.getElementById('dropTarget'))
    uploader.assignDrop(document.getElementById('dropTarget'))
  })
  uploader.on('fileAdded', (file, event) => {
    console.log(file, event)
  })
  return (
    <div class={style.demo}>
      <div id="dropTarget" class={style.demoBox}>
        dd
      </div>
      <div id="browseButton">上传</div>
    </div>
  )
};

export default UploadDemo;
