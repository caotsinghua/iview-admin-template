## MineCrud:sparkles:

> CRUD 组件允许你通过传入一些 props 和 events 直接生成增删改查逻辑，需要一些额外的功能也可以通过 slot 插入自己的内容。大部分 prop 与 iview 一致，只是放置的地方有区别。

<!-- STORY -->
### 代码
```js
<template>
    <mine-crud
        :data="sharedState.data"
        :columns="columns"
        :formColumns="formColumns"
        :formData="formData"
        :rules="rules"
        :onUpdateForm="handleUpdateForm"
        :onCreateForm="handleCreateForm"
        :onDeleteRow="handleDeleteRow"
        :pageConfig="pageConfig"
        :onBatchDelete="handleBatchDelete"
        @on-selection-change="handleSelectionChange"
        @on-change="handlePageChange"
        @on-page-size-change="handlePageSizeChange"
    ></mine-crud>
</template>

<script>
import MineCrud from '../../src/components/mine-crud';
import store, { types } from './store';
export default {
    components: {
        MineCrud
    },
    data() {
        return {
            sharedState: store.state,
            columns: [
                {
                    type: 'expand', // 无需设置render函数，会自动注入 | 设置render函数则按照render函数来渲染
                    width: 60,
                    // expandedColumns: ['name', 'age', 'type'], // 展开的key，和名称,不填名称默认和表格的title一致
                    expandedColumns: [
                        // 展开详情
                        'title',
                        'avatar',
                        { label: '作者', key: 'author' },
                        {
                            label: '发表时间',
                            key: 'publishTime',
                            value: (key, row) => {
                                return row[key];
                            }
                        },
                        {
                            key: 'type',
                            value: (key, row) => {
                                return types[row[key]];
                            }
                        }
                    ],
                    colNum: 3 // 每列几个字段
                },
                {
                    title: 'id',
                    key: 'id'
                },
                {
                    title: '标题',
                    key: 'title'
                },
                {
                    title: '类别',
                    align: 'center',
                    key: 'type',
                    render: (h, { row }) => {
                        return h('span', types[row['type']]);
                    }
                },
                {
                    title: '作者',
                    key: 'author'
                },
                {
                    title: '头像',
                    key: 'avatar'
                },

                {
                    title: '发表时间',
                    key: 'publishTime'
                }
            ],
            formData: {
                title: '',
                author: '',
                publishTime: '',
                avatar: '',
                type: ''
            },
            formColumns: [
                {
                    label: '标题',
                    prop: 'title'
                },
                {
                    label: '作者',
                    prop: 'author'
                },
                {
                    label: '头像',
                    prop: 'avatar',
                    type: 'image',
                    uploadConfig: {
                        action: 'https://www.baidu.com'
                    }
                },
                {
                    label: '发表时间',
                    prop: 'publishTime',
                    type: 'datetime'
                },
                {
                    label: '类型',
                    prop: 'type',
                    type: 'select',
                    dicts: Object.keys(types).map(key => ({
                        label: types[key],
                        value: key
                    }))
                }
            ],
            rules: {
                title: [
                    {
                        required: true,
                        message: '标题不能为空'
                    }
                ],
                author: [
                    {
                        required: true,
                        message: 'author不能为空'
                    }
                ],
                avatar: [
                    {
                        required: true,
                        message: 'avatar不能为空'
                    }
                ],
                publishTime: [
                    {
                        required: true,
                        message: 'publishTime不能为空'
                    }
                ]
            },
            batchItems: []
        };
    },
    computed: {
        pageConfig() {
            return {
                current: this.sharedState.page,
                'page-size': this.sharedState.pageSize,
                total: this.sharedState.total,
                'show-total': true
            };
        }
    },
    methods: {
        handleUpdateForm(row) {
            store.actions.updateRow(row);
        },
        handleCreateForm(data) {
            store.actions.createData(data);
        },
        handleDeleteRow(row) {
            console.log(row);
            store.actions.deleteRow(row);
        },
        handlePageChange(page) {
            store.actions.getData({ page });
        },
        handlePageSizeChange(pageSize) {
            store.actions.getData({ pageSize });
        },
        handleSelectionChange(selection) {
            console.log(selection);
            this.batchItems = selection;
        },
        handleBatchDelete() {
            console.log('batch');
            store.actions.batchAction(this.batchItems);
        }
    }
};
</script>

```
