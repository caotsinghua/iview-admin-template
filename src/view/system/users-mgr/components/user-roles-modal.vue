<template>
    <Modal title="权限角色" v-model="visible">
        <el-table :data="roles" v-loading="loading">
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="remark" label="角色备注"></el-table-column>
        </el-table>
        <Page
            :current="page"
            :page-size="pageSize"
            :total="total"
            show-total
            @on-change="handleRolePageChange"
            @on-page-size-change="handleRolePageSizeChange"
            style="text-align:right;margin-top:10px;"
        />
    </Modal>
</template>
<script>
import { getUserRoles } from '@/api/roles';
export default {
    data() {
        return {
            roles: [],
            page: 1,
            pageSize: 20,
            total: 0,
            userId: '',
            visible: false,
            loading: false
        };
    },
    methods: {
        show(row) {
            this.userId = row.userId;
            this.visible = true;
            this.getRoles();
        },
        hide() {
            Object.assign(this, this.$options.data());
        },
        async getRoles(query = {}) {
            const page = query.page || this.page;
            const pageSize = query.pageSize || this.pageSize;
            try {
                this.loading = true;
                const { data } = await getUserRoles({ userId: this.userId, currPage: page, pageSize });
                if (data.success && data.data) {
                    this.roles = data.data.list;
                    this.total = data.data.totalCount;
                    console.log(this.roles);
                }
            } finally {
                this.loading = false;
            }
        },
        handleRolePageChange(page) {
            if (page === this.page) return;
            this.getRoles({ page });
        },
        handleRolePageSizeChange(pageSize) {
            this.getRoles({ page: 1, pageSize });
        }
    }
};
</script>
