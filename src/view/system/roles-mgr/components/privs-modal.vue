<template>
    <Modal v-model="visible" title="添加权限" width="50%">
        <treeselect
            v-model="selectedPrivIds"
            :options="treeData"
            placeholder="请选择权限"
            noOptionsText="没有可选权限"
            flat
            multiple
            clearable
        >
            <label slot="option-label" slot-scope="{ node }">
                <Icon type="ios-folder" v-if="node.children" color="#2d8cf0" />
                <Icon type="ios-leaf" v-else color="#19be6b" />
                <span>{{ node.label }}</span>
            </label>
        </treeselect>
        <template slot="footer">
            <Button type="primary" @click="handleAdd">添加</Button>
            <Button @click="hide">取消</Button>
        </template>
    </Modal>
</template>
<script>
import { getPrivsNotInRole, addRolePrivs } from '@/api/privs';
import store from '../store';
import { parsePrivsToTreeData } from '@/libs/tools';
export default {
    data() {
        return {
            visible: false,
            selectedPrivIds: [],
            data: [],
            treeData: [],
            loading: false,
            storeState: store.state
        };
    },
    methods: {
        async getData(query = {}) {
            try {
                this.loading = true;
                const { data } = await getPrivsNotInRole(this.storeState.selectRoleId);
                if (data.success && data.data) {
                    this.data = data.data;
                    this.treeData = parsePrivsToTreeData(data.data, 0);
                }
            } finally {
                this.loading = false;
            }
        },
        show() {
            this.getData();
            this.visible = true;
        },
        hide() {
            this.visible = false;
        },
        async handleAdd() {
            if (this.selectedPrivIds.length === 0) {
                this.$Message.error('请先选择权限');
                return;
            }
            const { data } = await addRolePrivs({
                roleId: this.storeState.selectRoleId,
                privIds: this.selectedPrivIds
            });
            if (data.data && data.success) {
                this.$Message.success('添加成功');
                store.getPrivs();
                this.hide();
            }
        },
        handleSelectionChange(val) {
            this.selectedPrivIds = val.map(item => item.privId);
        }
    }
};
</script>
