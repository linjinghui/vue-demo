'use strict';
const path = require('path');
const express = require('express');
const webpack = require('webpack');
var proxy = require('http-proxy-middleware');
const webpackConfig = require('../config/webpack.dev');
const config = require('../config/config');
const childProcess = require('child_process');

const app = express();

webpackConfig.entry.client = [
  'webpack-hot-middleware/client',
  webpackConfig.entry.client
];

const compiler = webpack(webpackConfig);

const devMiddleWare = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
});

app.use(devMiddleWare);
app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
  const fs = devMiddleWare.fileSystem;

  devMiddleWare.waitUntilValid(() => {

    const html = fs.readFileSync(path.join(webpackConfig.output.path, './index.html'));

    res.end(html);
  });
});

// // 代理开始
// app.use('/apiframe', proxy('/apiframe', {
//   target: 'http://192.168.1.40:5001',
//   changeOrigoin: true
// }));

// app.use('/apiwidget', proxy('/apiwidget', {
//   target: 'http://192.168.1.40:5001',
//   changeOrigoin: true
// }));

// app.use('/apiorgan', proxy('/apiorgan', {
//   target: 'http://192.168.1.40:5001',
//   changeOrigin: true
// }));

// app.use('/apidata', proxy('/apidata', {
//   target: 'http://192.168.1.40:5001',
//   changeOrigin: true
// }));

// app.use('/apislt/index', proxy('/apislt/index', {
//   target: 'http://192.168.1.40:5001',
//   changeOrigin: true
// }));

// app.use('/apislt/portal', proxy('/apislt/portal', {
//   target: 'http://192.168.1.40:5001',
//   changeOrigin: true
// }));

// // 工作台相关代理
// app.use('/apidesk/portal', proxy('/apidesk/portal', {
//   target: 'http://192.168.1.40:5001',
//   changeOrigin: true
// }));

app.listen(config.port, () => {
  // console.log(`Listening at http://localhost:${config.port}`)
  var url = 'http://localhost:' + config.port;
  if (/^win/.test(process.platform)){
    childProcess.exec('start ' + url);
  }else{
    childProcess.exec('open ' + url);
  }
});
