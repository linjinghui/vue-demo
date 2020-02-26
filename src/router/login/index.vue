<template>
  <div class="wrap-login">
    <div class="main" :class="type">
      <lv-form class="form">
        <!-- 滑块验证码 -->
        <div class="wrap-slidercode" v-if="showSliderCode" @click="showSliderCode=false">
          <div @click.stop><lv-slidercode :imgUrl="sliderCodeImg" @success="sliderCodeSuccess"></lv-slidercode></div>
        </div>

        <div class="form-title">{{ctext.left.title}}</div>
        <div class="form-item">
          <div class="main">
            <lv-input v-model="account" placeholder="帐号" :autofocus="true" maxlength="50"></lv-input>
          </div>
        </div>
        <div class="form-item">
          <div class="main">
            <lv-input v-model="password" type="password" :placeholder="type==='find'?'新密码':'密码'" maxlength="50"></lv-input>
          </div>
        </div>
        <div class="form-item" v-if="type==='register'||type==='find'">
          <div class="main">
            <lv-input v-model="rpassword" type="password" placeholder="确认密码" maxlength="50"></lv-input>
          </div>
        </div>
        <div class="form-item" v-if="type==='register'||type==='find'">
          <div class="main">
            <lv-input v-model="code" placeholder="验证码" maxlength="6">
              <lv-button slot="right" style="font-size:12px;" width="80px" height="26px" disabledDuring="10" :beforeClick="beforeSend">发送短信</lv-button>
            </lv-input>
          </div>
        </div>
        <div class="form-item" v-if="type==='login'">
          <div class="main" style="display:flex;justify-content:space-between;">
            <lv-checkbox v-model="remenber" :val="true">记住密码</lv-checkbox>
            <lv-button theme="simple" @click="type='find'">忘记密码?</lv-button>
          </div>
        </div>
        <div class="form-footer">
          <lv-button :icon="loading&&'lv-icon-loading move-loop'" @click="clkLogin" v-if="type==='login'">登录</lv-button>
          <lv-button theme="line" v-if="type==='login'">使用微信帐号登录</lv-button>
          <lv-button :icon="loading&&'lv-icon-loading move-loop'" @click="clkRegister" v-if="type==='register'">注册</lv-button>
          <lv-button :icon="loading&&'lv-icon-loading move-loop'" @click="clkFindPwd" v-if="type==='find'">保存</lv-button>
        </div>
      </lv-form>
      <aside>   
        <h4>{{ctext.right.title}}</h4>
        <small>{{ctext.right.subTitle}}</small>
        <lv-button theme="line" @click="type='register'" v-if="type==='login'">注册</lv-button>
        <lv-button theme="line" @click="type='login'" v-else>登录</lv-button>
      </aside>
    </div>
  </div>
</template>

<script>
  import { Form, Input, Checkbox, Button, Slidercode } from 'lv-web-ui';
  import { login, register, sendMsg, findPwd } from '../../data/sys';
  
  export default {
    name: 'Login',
    components: {
      lvForm: Form,
      lvCheckbox: Checkbox,
      lvInput: Input,
      lvButton: Button,
      lvSlidercode: Slidercode
    },
    data () {
      return {
        key: 'USER_INFO',
        loading: false,
        showSliderCode: false,
        sliderCodeImg: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2353873632,2644143944&fm=26&gp=0.jpg',
        // 登录窗口文本
        loginText: {
          left: { title: 'MES系统管理' },
          right: { title: '还未注册？', subTitle: '立即注册，发现大量机会' }
        },
        // 注册窗口文本
        registerText: {
          left: { title: '立即注册' },
          right: { title: '已有帐号？', subTitle: '有帐号就登录吧，好久不见了！' }
        },
        // 忘记密码窗口文本
        findText: {
          left: { title: '重置密码' },
          right: { title: '已有帐号？', subTitle: '有帐号就登录吧，好久不见了！' }
        },
        // login|register|find
        type: 'login',
        // 是否记住密码
        remenber: false,
        // 帐号
        account: '',
        // 密码
        password: '',
        // 确认密码
        rpassword: '',
        // 短信验证码
        code: ''
      };
    },
    computed: {
      ctext () {
        return this.type === 'register' ? this.registerText : this.type === 'find' ? this.findText : this.loginText;
      }
    },
    watch: {
      type () {
        this.resetParams();
      }
    },
    mounted: function () {
      this.getAccount();
    },
    methods: {
      // 重置数据
      resetParams () {
        this.account = '';
        this.password = '';
        this.rpassword = '';
        this.code = '';
      },
      // 记住帐号密码
      saveAccount () {
        this.remenber && localStorage.setItem(this.key, JSON.stringify({ account: this.account, password: this.password }));
      },
      // 获取记住的帐号密码
      getAccount () {
        let data = localStorage.getItem(this.key);

        if (data) {
          data = JSON.parse(data);
          this.account = data.account;
          this.password = data.password;
          this.remenber = true;
        }
      },
      // 发送验证码前
      beforeSend (callback) {
        if (!this.account) {
          this.$tip({ text: '请输入帐号', type: 'warning' });
        } else {
          this.showSliderCode = true;
          this.$eventbus.$on('sliderCodeSuccess', () => {
            // 发送短信
            sendMsg({ account: this.account }).then(res => {
              callback();
            });
          });
        }
      },
      // 滑块验证码校验成功
      sliderCodeSuccess () {
        this.$eventbus.$emit('sliderCodeSuccess');
        this.$nextTick(() => {
          this.showSliderCode = false;
        });
      },
      // 登录
      clkLogin () {
        if (!this.account) {
          this.$tip({ text: '请输入帐号', type: 'warning' });
        } else if (!this.password) {
          this.$tip({ text: '请输入密码', type: 'warning' });
        } else {
          this.loading = true;
          login({ loginName: this.account, password: this.password }).then(res => {
            this.loading = false;
            // 记住帐号密码
            this.saveAccount();
            // 保存当前用户信息
            this.$store.commit('setUser', res.result);
            // 跳转首页
            this.$router.replace('index');
          }).catch(() => {
            this.loading = false;
          });
        }
      },
      // 注册
      clkRegister () {
        console.log('==clkRegister==', this.account, this.password, this.remenber);
        if (!this.account) {
          this.$tip({ text: '请输入帐号', type: 'warning' });
        } else if (!this.password) {
          this.$tip({ text: '请输入密码', type: 'warning' });
        } else if (this.password !== this.rpassword) {
          this.$tip({ text: '二次输入的密码不一致', type: 'warning' });
        } else if (!this.code) {
          this.$tip({ text: '请输入验证码', type: 'warning' });
        } else {
          this.loading = true;
          let params = { account: this.account, password: this.password, code: this.code };

          register(params).then(res => {
            this.$tip({ type: 'success', text: '注册成功' });
            this.loading = false;
            this.type = 'login';
            // 回填帐号、密码
            this.$nextTick(() => {
              this.account = params.account;
              this.password = params.password;
            });
          }).catch(() => {
            this.loading = false;
          });
        }
      },
      // 修改密码
      clkFindPwd () {
        if (!this.account) {
          this.$tip({ text: '请输入帐号', type: 'warning' });
        } else if (!this.password) {
          this.$tip({ text: '请输入新密码', type: 'warning' });
        } else if (this.password !== this.rpassword) {
          this.$tip({ text: '二次输入的密码不一致', type: 'warning' });
        } else if (!this.code) {
          this.$tip({ text: '请输入验证码', type: 'warning' });
        } else {
          this.loading = true;
          let params = { account: this.account, password: this.password, code: this.code };

          findPwd(params).then(res => {
            this.$tip({ type: 'success', text: '修改密码成功' });
            this.loading = false;
            this.type = 'login';
            // 回填帐号、密码
            this.$nextTick(() => {
              this.account = params.account;
              this.password = params.password;
            });
          }).catch(() => {
            this.loading = false;
          });
        }
      }
    }
  };
</script>

<style lang="scss">
  .wrap-login {
    // 滑块验证码
    .captcha-box {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 320px;
      height: 200px;
      z-index: 2;
    }
  }
</style>
<style scoped lang="scss">
  .wrap-login {
    width: 100%;
    height: 100%;
    background-color: #545c64;

    > .main {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 660px;
      height: 400px;
      background-color: #fff;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);

      .form {
        position: absolute;
        top: 0;
        left: 0;
        padding: 40px 100px;
        width: 70%;
        height: 100%;
        transition: all .3s;

        .form-title {
          font-weight: bold;
        }

        .input {
          border-width: 0;
          border-bottom-width: 1px;
          input {
            text-align: center;
          }
        }

        .form-footer {
          .button {
            margin-left: 0;
            margin-bottom: 10px;
            padding: 6px 0;
            width: 100%;
            border-radius: 20px;
            justify-content: center;
          }
        }
      }

      aside {
        position: absolute;
        top: 0;
        left: 70%;
        width: 30%;
        height: 100%;
        text-align: center;
        color: #fff;
        z-index: 2;
        background-size: cover;
        background-position-x: 100%;
        background-image: url(../../../static/imgs/login/banner.jpg);
        transition: all .3s;

        h4 {
          margin-top: 20%;
        }
        small {
          display: block;
          margin-top: 5%;
          margin-bottom: 100%;
        }
        
        .button {
          padding: 4px 24px;
          border-radius: 20px;
          border-width: 2px;
          background-color: transparent;
          font-size: 14px;
        }
      }
    }
    > .main:before {
      content: attr(data-name);
      position: absolute;
      left: 0;
      top: -54px;
      right: 0;
      margin: auto;
      width: 100%;
      height: 34px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      // background-color: #9fa0a1;
    }
    > .main.register,
    > .main.find {
      .form {
        left: 30%;
      }
      aside {
        left: 0;
        background-position-x: 0%;
      }
    }

    .wrap-slidercode {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 2;
    }
  }

</style>
