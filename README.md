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

- 状态管理

  >  该示例的数据管理基于[ 简单状态管理]( https://cn.vuejs.org/v2/guide/state-management.html )，可自行删除 store文件夹，将数据存在单文件vue中或由父级管理，也可以采用 vuex，视情况而定。

### 登陆状态

`src/libs/common-utils.js`中

-   用 getUserStatus（可获取用户信息和登陆态的接口）(/users/cur-user)判断登陆态和获取当前登陆用户的信息。
    
使用方法:
    
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

> 注:
>
> 1.如果用ci/cd，建议使用ci/cd的相关配置来设置验证码地址；
>
> 2.也可以根据当前访问host判断环境，在public/index.html中替换script代码：
>
> ```js
> <script>
> 		var isProd = window.location.hostname === 'qhkhgl.eastmoney.com' || window.location.hostname ===
> 			'https://scrm.eastmoney.com'
> 		var captUrl = isProd ? "https://cfgpassport2.eastmoney.com/captcha/scripts/em_capt.js" :
> 			"https://cfgpassportuat2.eastmoney.com/captcha/scripts/em_capt.js"
> 		document.write("<script src=" + captUrl + "><\/script>")
> 	</script>
> ```

-   使用
    
    目前模板中`src/components/login-form`默认启用。注意标记TODO注释的地方。
    
-   不使用
    1. 将以下内容注释
    
        ```
         <!-- 验证码相关 -->
                <input type="hidden" id="contextId" />
                <input type="hidden" id="accountIdHide" value="admin" />
                <div id="containerId" style="border:1px solid #d7dde4;width:100%;height:46px;margin-bottom:10px;"></div>
                <!-- end -->
         
        ```
    
    2. 去除mounted时的操作
    
    3. 修改 handleSubmit 中的相关信息
       主要是提交登陆接口时传入的参数

### 更新日志

修改根目录下 CHANGELOG.md。建议修改版本号时同时修改package.json中的version。

### 系统部署环境显示

在顶部栏显示系统的当前部署环境，开发，测试，生产环境等。

注意使用的环境字段。在src/components/main/components/env中修改

```
computed: {
        activeEnv() {
            return this.$store.state.app.env;
        }
    },
```

### appContainer

> 当在.vue 文件外使用 router 和根 vue 实例时，从 appContainer 中取得

-   为什么这样？
    如果从服务端取得权限路由再 addRoutes 到已有 router，当退出登陆后已有的路由不会清除，需要重新 initApp，createRouter。
    每次 initApp 时得到的是一个新的 router 对象和 vue 实例，为了能获取到准确的对象，使用 appContainer 包装


### axios 拦截

-   当 success!==true 时提示 message 错误信息

-   get请求默认加入时间戳,禁用缓存

-   当 code==='10000'时表示未登录，跳转登陆，不提示

    ```js
    if (data.code === '10000') {
        // 是否是获取用户信息/状态的接口
        const isGetInfo = ~res.config.url.indexOf('users/cur-user');
        if (!isGetInfo) {
            store.dispatch('handleLogOut');
        }
    }
    ```


### mock

在 mock 文件夹中进行mock

### 配置项

在原有config/index.js中添加了三个字段.根据实际情况启用

```json
     /**
     * @description 用户需要依赖部门管理
     */
    department: true,
    /**
     * @description 是否启用权限管理
     */
    usePermission: true,
    /**
     * @description 只有管理员可见的路由，usePermission时才有用，并且需要在router/index中设置判断管理员的条件
     */
    adminRoutes: ['system', 'users-mgr', 'roles-mgr', 'privs-mgr', 'dict-mgr','configs-mgr']
```



### 其他

有 TODO 开头的注释表示下面的内容可能需要修改

