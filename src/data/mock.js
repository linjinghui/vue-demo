import Mock from 'mockjs';

Mock.setup({
  // 表示响应时间介于 1000 和 3000 毫秒之间，默认值是'10-100'。
  timeout: '100-1000'
});

let demo = {
  'message': 'im msg',
  'code': 200,
  'msgDesc': 'im msgDesc',
  'result': '',
  'subMsg': 'im subMsg',
  'subMsgCode': 'im subMsgCode'
}

// 帐号密码登陆
Mock.mock(/(\/login)/, {
  'message': 'im msg',
  'code': 200,
  'result': {
    'avatar': '@img',
    'name': '@name'
  }
});

// 注册
Mock.mock(/(\/register)/, {
  'message': 'im msg',
  'code': 200
});

// 修改密码
Mock.mock(/(\/findPwd)/, {
  'message': 'im msg',
  'code': 200
});

// 发送短信
Mock.mock(/(\/send)/, {
  'message': 'im msg',
  'code': 200
});