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
        :onBatchDelete="handleBatchDelete"
        border
        stripe
    >
        <template slot="rewrite-row-actions" slot-scope="{ row }">
            <Dropdown>
                <Button>
                    更多操作
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem>操作1</DropdownItem>
                    <DropdownItem>操作2</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </template>
    </mine-crud>
</template>

<script>
import MineCrud from '../../src/components/mine-crud';
import store from './store';
export default {
    components: {
        MineCrud
    },
    data() {
        return {
            sharedState: store.state,
            columns: [
                {
                    title: 'id',
                    key: 'id'
                },
                {
                    title: '标题',
                    key: 'title'
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
                avatar: ''
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

<style scoped>
.container {
    padding: 20px;
}
</style>
