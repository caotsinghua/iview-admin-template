<template>
    <div class="container">
        <div style="display:flex;width:100%">
            <div style="width:250px;flex-shrink:0;margin-right:20px" v-if="showDepartment">
                <DepartmentTree />
            </div>
            <div :class="['user-table', { bordered: showDepartment }]">
                <UserTable />
            </div>
        </div>
    </div>
</template>
<script>
import DepartmentTree from './components/department-tree';
import UserTable from './components/user-table'; // 用户列表
import config from '@/config';
import store from './store';
export default {
    name: 'users-management',
    components: {
        DepartmentTree,
        UserTable
    },
    data() {
        return {
            storeState: store.state,
            showDepartment: config.department
        };
    }
};
</script>
<style lang="less" scoped>
.user-table {
    flex: 1;
    padding-left: 10px;
    overflow: hidden;
    &.bordered {
        border-left: 2px solid #f0f2f5;
    }
}
</style>
