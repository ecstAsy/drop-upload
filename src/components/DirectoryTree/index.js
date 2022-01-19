/*
 * @Author: ecstAsy
 * @Date: 2022-01-18 14:35:38
 * @LastEditTime: 2022-01-18 14:36:43
 * @LastEditors: ecstAsy
 */
import { h } from "preact";
import style from "./index.css";

const FileItem = ({ row }) => (
  <p>
    <i class={`icon icon-${row.icon}`} />
    <span>{row.name}</span>
  </p>
)

const TreeItem = ({ row }) => {
  if (row.children) {
    return (
      <li>
        <FileItem row={row} />
        <ul>
          {row.children.map(item => <TreeItem key={item.fullPath} row={item} />)}
        </ul>
      </li>
    )
  }
  return (
    <li>
      <FileItem row={row} />
    </li>
  )
}

const DirectoryTree = ({ trees }) => (
  <ul class={style.DirectoryTree}>
    {trees.map(item => <TreeItem key={item.fullPath} row={item} />)}
  </ul>
)

export default DirectoryTree 