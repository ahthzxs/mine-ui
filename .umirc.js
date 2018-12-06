
// ref: https://umijs.org/config/

import { resolve } from 'path'
// import { i18n } from './src/utils/config'

export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'mine-ui',
      dll: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],

  // locale: {
  //   enable: true, // default true
  //   default: 'zh-CN', // default zh-CN
  //   baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
  // },

  proxy: {
    '/api/': {
      target: 'http://127.0.0.1:8080/',
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
  },

}
