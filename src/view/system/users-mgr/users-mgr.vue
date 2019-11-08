<template>
    <div class="container">
        <UserTable />
    </div>
</template>
<script>
import UserTable from './components/user-table'; // 用户列表
import store from './store';
export default {
    name: 'users-management',
    components: {
        UserTable
    },
    data() {
        return {
            storeState: store.state
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
