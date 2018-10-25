<template>
  <div class="wrap page-home">
    <header></header>
    <nav>
      <ul class="aside-nav">
        <li v-for="(item1,index) in navOption.navData" :key="'lay1'+index">
          <a :class="{'active':navOption.activeIndex_1===item1.id, 'open': navOption.openIndex_1===item1.id}" @click="clkNavItem([item1])">
            <i style="border:solid 1px;" class="i-l">&nbsp;</i>
            <span>{{item1.name}}</span>
            <i style="border:solid 1px;" class="i-r arrow" v-if="item1.children&&item1.children.length>0"><</i>
          </a>
          <ul :style="{maxHeight:navOption.openIndex_1===item1.id?item1.children.length*36+'px':'0px'}">
            <li v-for="(item2,index) in item1.children" :key="'lay2'+index">
              <a :class="{'active':navOption.activeIndex_2===item2.id}" @click="clkNavItem([item1,item2])">
                <i style="border:solid 1px;" class="i-l">&nbsp;</i>
                <span>{{item2.name}}</span>
                <i class="i-r arrow" v-if="item2.children&&item2.children.length>0"><</i>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
  // import {Button} from 'web-base-ui';
  
  export default {
    name: 'Index',
    components: {
      // cmpButton: Button
    },
    data () {
      return {
        routerName: '',
        navOption: {
          openIndex_1: '',
          activeIndex_1: '',
          activeIndex_2: '',
          navData: [
            {
              id: '1',
              name: '应用管理',
              icon: '',
              url: '',
              children: [
                {
                  id: '1-1',
                  name: '混合应用',
                  icon: '',
                  url: 'mixapp',
                  children: []
                },
                {
                  id: '1-2',
                  name: 'H5应用',
                  icon: '',
                  url: 'h5app',
                  children: []
                }
              ]
            },
            {
              id: '2',
              name: '开发者工具',
              icon: '',
              url: 'devtool',
              children: []
            }
          ]
        }
      };
    },
    watch: {
      '$route': function (val) {
        this.routerName = val.name;
      }
    },
    mounted: function () {
      this.clkInitNav();
    },
    methods: {
      clkInitNav: function () {
        var _this = this;
        var routerName = this.$router.history.current.name;
        var obj = {};

        for (var i = 0;i < _this.navOption.navData.length;i++) {
          let item = _this.navOption.navData[i];

          if (JSON.stringify(item).indexOf(routerName) >= 0) {
            _this.navOption.openIndex_1 = item.id;
            _this.navOption.activeIndex_1 = item.id;
            obj = item;
            break;
          }
        }
        for (var l = 0;l < obj.children.length;l++) {
          let item = obj.children[l];

          if (JSON.stringify(item).indexOf(routerName) >= 0) {
            _this.navOption.activeIndex_2 = item.id;
            break;
          }
        }
      },
      clkNav: function (index) {
        this.$root.toPage('', index);
      },
      clkNavItem: function (arr) {
        var current = arr[arr.length - 1];
        var first = arr.length >= 1 ? arr[0] : {};

        // 激活节点
        if (!this.isEmpty(current.url)) {
          // step1 - 跳转
          this.$root.toPage('/#/' + current.url);
          // step2 - 激活当前
          this.navOption.activeIndex_2 = current.id;
          // step3 - 激活最上层
          this.navOption.activeIndex_1 = first.id;
        } else if (current.children && current.children.length > 0) {
          // 开启子节点
          this.navOption.openIndex_1 = this.navOption.openIndex_1 === current.id ? '' : current.id;
          this.navOption.activeIndex_2 = '';
        }
      },
      isEmpty: function (obj) {
        var objstr = JSON.stringify(obj);
        
        return typeof obj === 'undefined' || obj === null || obj === '' || objstr === '{}' || objstr === '[]';
      }
    }
  };
</script>

<style lang="scss"></style>
<style scoped lang="scss">
  .page-home {
    height: 100%;

    > header {
      height: 50px;
      box-shadow: 0 1px 10px #eee;
      // border-bottom: solid 1px #eee;
    }

    > nav,
    > section {
      float: left;
      height: calc(100% - 50px);
    }

    > nav {
      width: 240px;
      color: #fff;
      background-color: #122535;
    }

    > section {
      width: calc(100% - 240px);
      overflow: auto;
    }

  }
</style>
<style scoped class="css-nav">
  /* 全局 */
  .aside-nav {
    position: relative;
    width: 100%;
    color: #b8c7ce;
    user-select: none;
  }
  .aside-nav li > a {
    display: block;
    padding: 12px 5px 12px 15px;
    cursor: pointer;
  }
  .aside-nav li > a > * {
    display: inline-block;
    min-width: 20px;
    min-height: 20px;
    font-style: normal;
    vertical-align: middle;
  }
  .aside-nav li > a > .i-l {
    width: 22px;
    border: solid 1px transparent;
  }
  .aside-nav li > a > .fa-circle-o {
    line-height: 20px;
    font-size: 14px;
    text-align: center;
  }
  .aside-nav li > a > .i-r {
    float: right;
    border: solid 1px transparent;
  }
  .aside-nav li > a > .arrow {
    line-height: 14px;
    text-align: center;
    transform: rotate(90deg);
    transition: transform .4s ease;
  }
  .aside-nav li > a.open > .arrow {
    transform: rotate(0deg);
  }
    
  /* 除了最上层 */
  .aside-nav ul {
    width: 100%;
    overflow: hidden;
    color: #8aa4af;
    background-color: #2c3b41;
    transition: max-height .4s ease;
  }
  .aside-nav ul > li > a {
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .aside-nav ul > li > a.active,
  .aside-nav ul > li > a:hover {
    color: #fff;
  }

  /* 最上层 */
  .aside-nav > li > a {
    border-color: transparent;
    border-left: solid 3px transparent;
  }
  .aside-nav > li > ul > li > a {
    /* padding-left: 26px; */
    padding-left: 18px;

  }
  .aside-nav > li > ul > li > ul > li > a {
    /* padding-left: 36px; */
    padding-left: 18px;
  }

  /* theme */
  .aside-nav > li > a.open,
  .aside-nav > li > a:hover {
    color: #fff;
    background-color: #1e282c;
  }
  .aside-nav > li > a.active {
    border-color: var(--theme);
  }  
</style>