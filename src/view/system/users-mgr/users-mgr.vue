<template>
    <div class="container">
        <UserTable />
    </div>
</template>
<script>
import UserTable from './components/user-table'; // 用户列表

import store from './store';
export default {
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
