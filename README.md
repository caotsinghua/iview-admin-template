<p align="center">
    <a href="https://www.iviewui.com">
        <img width="200" src="https://file.iviewui.com/logo-new.svg">
    </a>
</p>

<h1>
iView Admin
    <h3>Vue.js 2.0 admin management system template based on iView.</h3>
</h1>

[![](https://img.shields.io/github/release/iview/iview-admin.svg)](https://github.com/iview/iview-admin/releases)
[![](https://img.shields.io/travis/iview/iview-admin.svg?style=flat-square)](https://travis-ci.org/iview/iview-admin)
[![vue](https://img.shields.io/badge/vue-2.5.17-brightgreen.svg?style=flat-square)](https://github.com/vuejs/vue)
[![iview ui](https://img.shields.io/badge/iview-3.2.2-brightgreen.svg?style=flat-square)](https://github.com/iview/iview)
[![npm](https://img.shields.io/npm/l/express.svg)]()

### iview-admin

[文档](https://lison16.github.io/iview-admin-doc/#/)

### 说明

编写 crud 管理时，在 view/todos 中为示例，可 copy 后加以修改,提测前可删除。

该示例基于 store 模式，可自行删除 store，将数据全部由一个 vue 管理或父级管理，也可以采用 vuex 管理。

### 登陆状态

`src/libs/common-utils.js`中

-   使用 token 保存登陆态
    1. 在 main.js 中引用 initAppByToken
    ```
    import { initAppByToken, disableLog, logBuildInfo } from './libs/common-utils';
    ...
    // 在文件最后加入以下内容即可（可参考已有的main.js）
    initAppByToken();
    ```
    2. 在登陆后需通过 setToken 保存 cookie，自行添加
-   使用 getUserStaus（可获取用户信息和登陆态的接口）判断登陆态
    直接参考现有的 main.js 即可。

    1. main.js 中引用 js 中引用 initAppByStatus
    2. 在 main.js 中调用

-   登陆状态保存在 store 中
    登陆状态是 store.state.user.hasLogged,一切对登陆态的判断都基于此。
    获取和设置登陆态的方法参考 store/user 中的 getUserStatus
    ```
    // 获取用户信息和状态
    async getUserStatus({ commit }, status) {
        // 直接设置登陆态
        if (status !== undefined) {
            commit('setHasLogged', status);
            return;
        }
        const { data } = await getUserStatus();
        if (data.success && data.data) {
            commit('setUserInfo', data.data);
            commit('setHasLogged', true);
            commit('setHasGetInfo', true);
            commit('setAccess', data.data.roles);
            return true;
        } else {
            commit('setHasGetInfo', false);
            commit('setUserInfo', {});
            commit('setAccess', []);
            commit('setHasLogged', false);
            return false;
        }
    }
    ```

### 验证码

在`buildconfig.js`中设置验证码插件地址，在`src/components/login-form`中使用

-   使用
    1. 保持现有内容
    2. 去掉如下注释
        ```
        handleSubmit() {
                this.captchaConsolidateReq.ContextId = capt && capt.getValidate().contextId;
                this.captchaConsolidateReq.ValidateResult = capt && capt.getValidate().validate;
                // TODO:启用验证码时开启必选
                // if (!this.captchaConsolidateReq.ContextId || !this.captchaConsolidateReq.ValidateResult) {
                //     console.log(this.captchaConsolidateReq);
                //     this.$Message.warning({
                //         content: '请输入合法验证码',
                //         duration: 5,
                //         closable: true
                //     });
                //     return;
                // }
        ```
    3. 对 getAppId 中的接口地址进行调整
        ```
        getAppId() {
                axios
                    .request({
                        url: '/sys/gencontext', // 该接口可能不一样
                        method: 'post',
                        data: { AppId: '201901231134', Scope: 'ICM' } // 该参数可能不一样
                    })
        ```
-   不使用
    1. 将以下内容注释
        ```
        <!-- 验证码相关 -->
            <input type="hidden" id="contextId" />
            <input type="hidden" id="accountIdHide" value="admin" />
            <div id="containerId" style="border:1px solid #d7dde4;width:100%;height:46px;margin-bottom:10px;"></div>
        <!-- end -->
        ```
    2. 不需要 mounted 中以下内容
    ```
    mounted() {
        this.getAppId();
        timer = setInterval(() => {
            this.getAppId();
        }, 1000 * 60 * 5);
    },
    ```
    3. 修改 handleSubmit 中的相关信息
       主要是提交登陆接口时传入的参数

### 更新日志

修改根目录下 CHANGELOG.md

### 系统部署环境显示

在顶部栏显示系统的当前部署环境，开发，测试，生产环境等。
在 src/components/main/main.vue 中修改决定是否使用

```
<header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
    <user :message-unread-count="unreadCount" :user-avatar="userAvatar" />
    <Env />
    <!-- <fullscreen v-model="isFullscreen" style="margin-right: 10px;" /> -->
</header-bar>
```

修改 src/components/main/components/env
和 store/app 中的 env 决定参数名是什么

### appContainer

> 当在.vue 文件外使用 router 和根 vue 实例时，从 appContainer 中取得

-   为什么这样？
    如果从服务端取得权限路由再 addRoutes 到已有 router，当退出登陆后已有的路由不会清除，需要重新 initApp，createRouter。
    每次 initApp 时得到的是一个新的 router 对象和 vue 实例，为了能获取到准确的对象，使用 appContainer 包装

-   没有权限管理？
    不需要修改文件

### axios 拦截

-   当 success!==true 时提示 message 错误信息

-   当 code==='10000'时表示未登录，跳转登陆，不提示

    ```js
    if (data.code === '10000') {
        // 是否是获取用户信息/状态的接口
        const isGetInfo = ~res.config.url.indexOf('user/status');
        if (!isGetInfo) {
            store.dispatch('handleLogOut');
        }
    }
    ```

    需要根据实际 api 修改 isGetInfo 的判断逻辑

### 其他

有 TODO 开头的注释表示下面的内容可能需要修改
