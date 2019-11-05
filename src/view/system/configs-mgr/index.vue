<template>
    <div class="container options-mgr-table">
        <div class="header-search-wrap">
            <HeaderSearch></HeaderSearch>
        </div>
        <div class="header-actions">
            <Button type="primary" icon="md-add" @click="handleAddRow">新增</Button>
        </div>
        <main>
            <Table border :data="storeState.data" :columns="columns" :loading="storeState.loading">
                <template slot="actions" slot-scope="{ row }">
                    <div class="row-actions">
                        <Button size="small" type="primary" @click="handleEditRow(row)">编辑</Button>
                    </div>
                </template>
            </Table>
            <Row type="flex" justify="end" style="margin-top:15px">
                <Col>
                    <Page
                        :current="storeState.page"
                        :total="storeState.total"
                        :page-size="storeState.pageSize"
                        show-sizer
                        show-total
                        @on-change="handlePageChange"
                        @on-page-size-change="handlePageSizeChange"
                /></Col>
            </Row>
        </main>
        <EditModal ref="edit-modal" />
    </div>
</template>

<script>
import HeaderSearch from './components/header-search';
import EditModal from './components/edit-modal';
import store from './store';
export default {
    name: 'options-mgr-table',
    components: {
        HeaderSearch,
        EditModal
    },
    data() {
        return {
            storeState: store.state,
            columns: [
                {
                    title: '配置名称',
                    key: 'configName',
                    align: 'center',
                    minWidth: 100
                },
                {
                    title: '配置编码',
                    key: 'configCode',
                    align: 'center',
                    minWidth: 100
                },
                {
                    title: '配置值',
                    key: 'configValue',
                    align: 'center',
                    minWidth: 100
                },
                {
                    title: '描述',
                    key: 'configDesc',
                    align: 'center',
                    minWidth: 100
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    align: 'center',
                    minWidth: 150
                },
                {
                    title: '更新时间',
                    key: 'updateTime',
                    align: 'center',
                    minWidth: 150
                },
                {
                    title: '操作',
                    slot: 'actions',
                    align: 'center',
                    minWidth: 80
                }
            ]
        };
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            store.getData();
        },
        handleEditRow(row) {
            this.$refs['edit-modal'].show(row);
        },
        handleAddRow() {
            this.$refs['edit-modal'].show();
        },
        handlePageChange(page) {
            if (page === this.storeState.page) return;
            store.getData({ page });
        },
        handlePageSizeChange(pageSize) {
            store.getData({ page: 1, pageSize });
        }
    }
};
</script>

<style lang="less" scoped>
.header-search-wrap {
    margin: 10px 0 20px;
}
.header-actions {
    margin: 15px 0;
    button {
        margin-right: 10px;
    }
}
.row-actions {
    button {
        margin-right: 10px;
    }
}
</style>
