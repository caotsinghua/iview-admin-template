<template>
    <Modal v-model="visible" title="编辑部门" width="90%" :footer-hide="true" @on-cancel="hide">
        <DeptManagement @fetch-tree-data="getTreeData" />
    </Modal>
</template>
<script>
import DeptManagement from '../../dept-management/dept-management';
import store from '../store';
export default {
    components: {
        DeptManagement
    },
    data() {
        return {
            visible: false
        };
    },
    methods: {
        show() {
            this.visible = true;
        },
        hide() {
            this.visible = false;
        },
        getTreeData() {
            store.getTreeData();
        }
    }
};
</script>
