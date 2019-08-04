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
<template>
    <div>
        <h1>crud</h1>
        <MineCrud
            :dataSource="dataSource"
            :columns="columns"
            :formColumns="formColumns"
            :formData="formData"
            :rules="rules"
            :onUpdateForm="handleUpdateForm"
            :onCreateForm="handleCreateForm"
            :onDeleteRow="handleDeleteRow"
            :pageConfig="pageConfig"
            @on-change="handlePageChange"
            :hasBatchDelBtn="true"
        >
            <!-- 重写行操作 -->
            <!-- <template slot="rewrite-row-actions" slot-scope="{ row }">
                <p>{{ row.name }}</p>
            </template> -->
            <!-- 添加行操作 -->
            <template slot="append-row-actions" slot-scope="{ row }">
                <span>添加span{{ row.name }}</span>
            </template>
            <!-- 添加顶部左侧操作 -->
            <template slot="left-actions">
                <button>left</button>
            </template>
            <!-- 添加顶部右侧操作 -->
            <template slot="right-actions">
                <button>right</button>
            </template>
        </MineCrud>
    </div>
</template>

<script>
import MineCrud from '../../components/crud-table';
export default {
    name: 'crud-table',
    components: {
        MineCrud
    },
    data() {
        const testValidator = (rule, value, callback) => {
            console.log('testValidator', { name: this.formData.name });
            if (value === '') {
                callback(new Error('Please enter something'));
            } else {
                callback();
            }
        };
        return {
            dataSource: [
                {
                    id: 123,
                    name: '张三',
                    age: 12,
                    type: '学生',
                    avatar: 'https://cn.vuejs.org/images/logo.png'
                },
                {
                    id: 1234,
                    name: '李四',
                    age: 22,
                    type: '老师',
                    avatar: 'https://cn.vuejs.org/images/logo.png'
                }
            ],
            columns: [
                {
                    type: 'expand', // 无需设置render函数，会自动注入 | 设置render函数则按照render函数来渲染
                    width: 60,
                    // expandedColumns: ['name', 'age', 'type'], // 展开的key，和名称,不填名称默认和表格的title一致
                    expandedColumns: [
                        'name',
                        { label: '年龄2', key: 'age' },
                        { label: '类型', key: 'type', value: key => 'hello' },
                        'avatar'
                    ],
                    colNum: 3 // 每列几个字段
                },
                {
                    title: 'id',
                    key: 'id'
                },
                {
                    title: '名字',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '类型',
                    key: 'type'
                },
                {
                    title: '头像',
                    key: 'avatar'
                }
            ],
            formData: {
                name: '',
                age: '',
                type: '学生',
                avatar: ''
            },
            formColumns: [
                {
                    label: '名字',
                    prop: 'name'
                },
                {
                    label: '年龄',
                    prop: 'age'
                    // type: 'date',
                    // format: 'yyyy年MM月dd日'
                },
                {
                    label: '类型',
                    prop: 'type',
                    type: 'select',
                    dicts: [
                        {
                            label: '学生',
                            value: '学生'
                        },
                        {
                            label: '老师',
                            value: '老师'
                        }
                    ]
                },
                {
                    label: '头像',
                    prop: 'avatar',
                    type: 'image',
                    uploadConfig: {
                        action: 'https://www.baidu.com',
                        'on-error': (error, file, fileList) => {
                            console.log(this);
                            console.log({ error, file, fileList });
                        }
                    }
                }
            ],
            rules: {
                name: [{ required: true, message: '必须填写' }],
                age: [
                    {
                        validator: testValidator,
                        trgger: 'change'
                    }
                ]
            },
            pageConfig: {
                total: 10,
                current: 2,
                'page-size': 5,
                'show-total': true
            }
        };
    },
    methods: {
        async handleUpdateForm(form) {
            console.log(form);
            console.log(this.formData.name);
        },
        async handleCreateForm(form) {
            console.log(this.formData);
        },
        async handleDeleteRow(row) {
            console.log(row);
        },
        handlePageChange(page) {
            console.log(page);
        }
    }
};
</script>


```
