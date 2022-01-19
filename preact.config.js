/*
 * @Author: ecstAsy
 * @Date: 2022-01-17 09:33:37
 * @LastEditTime: 2022-01-19 09:22:02
 * @LastEditors: ecstAsy
 */
export default (config, env, helpers) => {
  // devServer doesn't exist on production builds
  if (!env.isProd) {
    config.devServer.proxy = [
      {
        path: '/',
        target: 'http://localhost:990',
      }
    ];
  }
}