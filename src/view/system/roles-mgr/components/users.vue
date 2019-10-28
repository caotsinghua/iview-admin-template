<template>
    <div class="users">
        <header>
            <div class="actions">
                <Button type="primary" icon="md-add" @click="handleAddUsers" :disabled="!storeState.selectRoleId"
                    >添加用户</Button
                >
            </div>
        </header>
        <el-table :data="storeState.users" v-loading="storeState.userLoading" empty-text="请先选择角色" size="mini">
            <el-table-column prop="index" label="序号"></el-table-column>
            <el-table-column label="用户名" prop="userName"></el-table-column>
            <el-table-column label="姓名" prop="realName"></el-table-column>
            <el-table-column label="rtx工号" prop="workNo"></el-table-column>
            <el-table-column label="手机" prop="mobile" width="120"></el-table-column>
            <el-table-column label="邮箱" prop="email" width="200"></el-table-column>
            <!-- TODO:字段对应 -->
            <!-- <el-table-column label="权限角色" prop="id"></el-table-column>
            <el-table-column label="部门名称" prop="deptId"></el-table-column>
            <el-table-column label="入职时间" prop="entryDate" :formatter="dateFormatter"></el-table-column>
            <el-table-column label="离职时间" prop="leaveDate" :formatter="dateFormatter"></el-table-column> -->
            <!-- <el-table-column label="状态" prop="status" :formatter="statusFormatter"> </el-table-column> -->
            <el-table-column label="操作">
                <template slot-scope="{ row }">
                    <Button type="error" @click="handleDeleteRow(row)">删除</Button>
                </template>
            </el-table-column>
        </el-table>
        <Row type="flex" justify="end" style="margin-top:10px">
            <Col>
                <Page
                    :current="storeState.userPage"
                    :page-size="storeState.userPageSize"
                    :total="storeState.userTotal"
                    show-sizer
                    show-elevator
                    show-total
                    @on-change="handlePageChange"
                    @on-page-size-change="handlePageSizeChange"
                    :page-size-opts="[20, 50, 100]"
                    transfer
                />
            </Col>
        </Row>
        <UsersModal ref="users-modal" />
    </div>
</template>
<script>
import store from '../store';
import { deleteUserRoles } from '@/api/roles';
import UsersModal from './users-modal';
export default {
    components: {
        UsersModal
    },
    data() {
        return {
            storeState: store.state
        };
    },
    methods: {
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
                content: '确定删除该用户？',
                onOk: async () => {
                    const { data } = await deleteUserRoles(row.userId, [store.state.selectRoleId]);
                    if (data.success && data.data) {
                        this.$Message.success('删除成功');
                        store.getUsers();
                    }
                }
            });
        },
        handleAddUsers() {
            if (!this.storeState.selectRoleId) {
                this.$Message.error('请先选择角色');
                return;
            }
            this.$refs['users-modal'].show();
        }
    }
};
</script>
