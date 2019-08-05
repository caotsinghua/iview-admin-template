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

## mine-crud 组件

[文档地址](https://jolly-shaw-eee7e6.netlify.com)

功能：

-   表格

    -   [x] 根据 columns 渲染列表，获取 data
    -   [x] 分页（与 iview-page 一致）
    -   [x] 定义详情显示字段（通过 expand）
    -   [x] 多选，批量删除或其他批量操作
        -   :hasBatchDelBtn 只控制多选按钮和删除按钮的显示，具体逻辑自行实现
        -   自己写@on-selection-change 逻辑，
        -   批量删除按钮需要传入:onBatchDelete,无参数，自己处理多选的数据集
    -   [x] 导出 csv -hasExportCsvBtn=true 需要时自定义 exportCsvConfig

-   表单
    -   [x] 修改数据，删除数据，添加数据（弹出框）
    -   [o] 自定义弹出框内容（自定义行操作按钮，覆盖原操作）
    -   [x] 表单上传文件 (formColumns 里的 type 为 file 或 image，将 Upload 组件的 props 写在 uploadConfig 中)

### 示例

```


```
