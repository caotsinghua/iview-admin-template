<template>
    <div class="privs">
        <header>
            <div class="actions">
                <Button type="primary" @click="handleSavePrivs">保存</Button>
                <Button @click="initTreeSelect" style="margin-left:10px">重置</Button>
            </div>
        </header>
        <div class="tree-select-header">
            <span>权限名称</span>
            <span>权限编码</span>
        </div>
        <treeselect
            :multiple="true"
            :options="storeState.allPrivsTreeData"
            value-consists-of="ALL_WITH_INDETERMINATE"
            v-model="selectedPrivIds"
            :defaultExpandLevel="Infinity"
            alwaysOpen
            placeholder="选择权限"
            noOptionsText="没有可选权限"
        >
            <label slot="option-label" slot-scope="{ node }" class="option-label">
                <div class="label-title">
                    <Icon type="ios-folder" v-if="node.children" color="#2d8cf0" style="margin-right:5px;" />
                    <Icon type="ios-leaf" v-else color="#19be6b" style="margin-right:5px;" />
                    <span class="label">{{ node.label }}</span>
                </div>
                <span class="item"
                    ><Icon type="md-code-working" color="#19be6b" style="margin-right:5px;" />{{
                        node.raw.privCode
                    }}</span
                >
            </label>
        </treeselect>
    </div>
</template>
<script>
import store from '../store';
import { deleteRolePrivs, addRolePrivs } from '@/api/privs';
export default {
    data() {
        return {
            storeState: store.state,
            selectedPrivIds: []
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.initTreeSelect();
        });
    },
    methods: {
        initTreeSelect() {
            const selectedIds = this.storeState.privs.map(item => item && item.privId).filter(item => !!item);
            this.selectedPrivIds = selectedIds;
        },
        handlePageChange(page) {
            if (this.storeState.page === page) return;
            store.getUsers({ page });
        },
        handlePageSizeChange(pageSize) {
            store.getUsers({ page: 1, pageSize });
        },
        handleDeleteRow(row) {
            this.$Modal.confirm({
                title: '警告',
                content: '确定删除该权限？',
                onOk: async () => {
                    const { data } = await deleteRolePrivs({
                        roleId: store.state.selectRoleId,
                        privIds: [row.privId]
                    });
                    if (data.success && data.data) {
                        this.$Message.success('删除成功');
                        store.getPrivs();
                    }
                }
            });
        },
        handleAddPrivs() {
            if (!store.state.selectRoleId) {
                this.$Message.error('请先选择一个角色');
                return;
            }
            this.$refs['privs-modal'].show();
        },
        handleSelectionChange(val) {
            this.selectedPrivIds = val.map(item => item.privId);
        },
        async handleSavePrivs() {
            const { data } = await addRolePrivs({
                roleId: this.storeState.selectRoleId,
                privIds: this.selectedPrivIds
            });
            if (data.success && data.data) {
                this.$Message.success('保存成功');
                await store.getPrivsData();
                this.initTreeSelect();
            }
        }
    }
};
</script>

<style lang="less" socped>
.privs {
    max-width: 1100px;
    .vue-treeselect__control {
        display: none;
    }
    .vue-treeselect {
        position: static;
    }
    .vue-treeselect__label-container {
        table-layout: auto;
    }
    .vue-treeselect__option {
        table-layout: auto;
    }
    .vue-treeselect__menu-container {
        position: static;
        box-sizing: border-box;
    }
    .vue-treeselect__menu {
        max-height: 5000px !important;
        position: static;
        box-sizing: border-box;
    }
}
.option-label {
    font-size: 12px;
    line-height: 25px;
    display: flex;
    align-items: center;
    padding: 5px 0;
    width: 100%;
    .label-title {
        // min-width: 200px;
        flex: 1;
        box-sizing: border-box;
        padding-left: 10px;
        display: block;
    }
    .item {
        flex: 1;
        text-align: left;
        box-sizing: border-box;
        padding: 0 20px;
        display: block;
    }
}
.tree-select-header {
    display: flex;
    border: 1px solid #ccc;
    border-bottom: none;
    padding: 5px 0 5px 60px;
    font-size: 14px;
    margin-top: 15px;
    span {
        flex: 1;
        display: block;
    }
}
</style>
