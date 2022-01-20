/*
 * @Author: ecstAsy
 * @Date: 2022-01-18 11:10:40
 * @LastEditTime: 2022-01-19 17:34:21
 * @LastEditors: ecstAsy
 */

import { h } from "preact";
import Mask from "../Mask";
import Loading from "../Loading";

const PageLoading = ({ visible }) => {
  return (
    <Mask visible={visible} color="rgba(255, 255, 255, .58)">
      <Loading />
    </Mask>
  )
}

export default PageLoading