<template>
    <div>
        <h1>crud</h1>
        <crud
            :data="data"
            :columns="columns"
            :formColumns="formColumns"
            :formData="formData"
            :rules="rules"
            :onUpdateForm="handleUpdateForm"
            :onCreateForm="handleCreateForm"
            :onDeleteRow="handleDeleteRow"
            :pageConfig="pageConfig"
            :rowActionsWidth="300"
            @on-change="handlePageChange"
            :hasBatchDelBtn="true"
        >
            <!-- 重写行操作 -->
            <!-- <template slot="rewrite-row-actions" slot-scope="{ row }">
                <p>{{ row.name }}</p>
            </template> -->
            <!-- 添加行操作 -->
            <template slot="append-row-actions" slot-scope="{ row }">
                <span>添加rowAction{{ row.name }}</span>
            </template>
            <!-- 添加顶部左侧操作 -->
            <template slot="left-actions">
                <span>append left</span>
            </template>
            <!-- 添加顶部右侧操作 -->
            <template slot="right-actions">
                <span>append right</span>
            </template>
        </crud>
    </div>
</template>

<script>
import crud from '../../components/crud';
export default {
    name: 'crud-table',
    components: {
        crud
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
            data: [
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
                // {
                //     type: 'selection',
                //     width: 50
                // },
                {
                    type: 'expand', // 无需设置render函数，会自动注入 | 设置render函数则按照render函数来渲染
                    width: 50,
                    // expandedColumns: ['name', 'age', 'type'], // 展开的key，和名称,不填名称默认和表格的title一致
                    expandedColumns: [
                        'name',
                        { label: '年龄2', key: 'age' },
                        { label: '类型', key: 'type', value: (key, row) => row[key] },
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
