import {$http, $tip} from './constant.js';
// import {ssgGetData, ssgSaveData, ssgDeleteData} from 'web-js-tool';

const URL = '/api';
// ===================================================[DEMO]===================================================
/**
 * demo-get
 * @param {string} pms.name - 名字 
 * @param {function} callback - 回调函数 
 */
export function ajaxGet (pms, callback) {
  let params = {
    name: pms.name
  };
  
  console.log(params);

  $tip({ show: true, text: '请输入栏目名称', theme: 'warning' });
  $http({
    method: 'GET',
    url: URL + '/portal/widget',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
    if (successData.body.msgCode !== 200) {
      $tip({ show: true, text: successData.body.msgDesc, theme: 'danger' });
    }
  });
}

/**
 * demo-post
 * @param {string} pms.name - 名字 
 * @param {function} callback - 回调函数 
 */
export function ajaxPost (pms, callback) {
  let params = {
    name: pms.name
  };
  
  console.log(params);

  $http({
    method: 'POST',
    url: URL + '/portal/widget',
    body: params,
    emulateJSON: true
  }).then(function (successData) {
    callback && callback(successData.body);
    if (successData.body.msgCode !== 200) {
      $tip({ show: true, text: successData.body.msgDesc, theme: 'danger' });
    }
  });
}
