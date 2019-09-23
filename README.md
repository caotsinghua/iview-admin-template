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

### 说明

编写 crud 管理时，按照如下结构分层
使得所有该资源下的组件都可以共享 store 数据，而不会影响到其他的页面。
不同页面共享的数据应该在 vuex 的 store 里。

```
- api
  - api.js //接口函数
- view
  - crud
    - components // 组件
    - store
      - index.js // 存放本资源组件之间共享的数据
    - crud-table.vue
```

在 view/articles 中为示例，可 copy 后加以修改。
