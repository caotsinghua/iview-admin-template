<template>
    <div class="user-table">
        <header>
            <Row type="flex" justify="space-between">
                <Col :span="16">
                    <Form :label-width="50" inline>
                        <FormItem label="关键字">
                            <Input placeholder="用户名、姓名" v-model.trim="queryForm.keyword" />
                        </FormItem>
                        <Button type="primary" @click="handleSearch">查询</Button>
                    </Form>
                </Col>
                <Col>
                    <div class="right-actions">
                        <Button @click="handleAdd" type="primary" icon="md-add" style="margin-right:10px;"
                            >新建用户</Button
                        >
                    </div>
                </Col>
            </Row>
        </header>
        <main>
            <el-table :data="storeState.data" v-loading="storeState.loading" size="mini">
                <el-table-column prop="index" label="序号"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="{ row }">
                        <Dropdown transfer @on-click="handleAction($event, row)" size="small">
                            <Button type="primary" size="small">
                                操作
                                <Icon type="ios-arrow-down"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="basic">编辑基本信息</DropdownItem>
                                <DropdownItem name="reset-password">重置密码</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </template>
                </el-table-column>
                <el-table-column label="用户名" prop="userName"></el-table-column>
                <el-table-column label="姓名" prop="realName"></el-table-column>
                <el-table-column label="手机" prop="phone"></el-table-column>
                <el-table-column label="邮箱" prop="email" width="200px"></el-table-column>
                <el-table-column label="权限角色">
                    <template slot-scope="{ row }">
                        <a @click="handleShowUserRoles(row)">查看</a>
                    </template>
                </el-table-column>
            </el-table>
            <Row type="flex" justify="end" style="margin-top:10px">
                <Col>
                    <Page
                        :current="storeState.page"
                        :page-size="storeState.pageSize"
                        :total="storeState.total"
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
            <EditModal ref="edit-modal" />
            <UserRolesModal ref="user-roles-modal" />
        </main>
    </div>
</template>
<script>
import store from '../store';
import EditModal from './edit-modal';
import UserRolesModal from './user-roles-modal';
import { resetPassword } from '@/api/user';
export default {
    components: {
        EditModal,
        UserRolesModal
    },
    data() {
        return {
            storeState: store.state,
            queryForm: store.state.queryForm
        };
    },
    mounted() {
        store.getData();
    },
    methods: {
        handleAdd() {
            this.$refs['edit-modal'].show();
        },
        handleSearch() {
            store.getData({ page: 1 });
        },
        async handleAction(name, row) {
            switch (name) {
                case 'basic': {
                    this.$refs['edit-modal'].show(row);
                    break;
                }
                case 'reset-password': {
                    const { data } = await resetPassword(row.userId);
                    if (data.success && data.data) {
                        this.$Message.success({
                            content: '重置密码成功,默认密码为Abce1234',
                            closable: true,
                            duration: 10
                        });
                        store.getData();
                    }
                }
            }
        },
        handlePageChange(page) {
            if (page === this.storeState.page) return;
            store.getData({ page });
        },
        handlePageSizeChange(pageSize) {
            store.getData({ page: 1, pageSize });
        },
        handleShowUserRoles(row) {
            this.$refs['user-roles-modal'].show(row);
        }
    }
};
</script>
