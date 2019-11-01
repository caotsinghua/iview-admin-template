<template>
    <Modal v-model="visible" width="800" title="添加用户" @on-cancel="hide">
        <div class="search-wrap">
            <Form :label-width="80" @submit.native.prevent>
                <Row :gutter="10">
                    <Col :span="12">
                        <FormItem label="关键词">
                            <Input v-model.trim="keyword" />
                        </FormItem>
                    </Col>
                    <Col :span="4">
                        <Button type="primary" @click="handleSearch">查询</Button>
                    </Col>
                </Row>
            </Form>
        </div>
        <el-table
            :data="data"
            v-loading="loading"
            @selection-change="handleSelectionChange"
            max-height="400"
            size="small"
        >
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="用户名" prop="userName"></el-table-column>
            <el-table-column label="姓名" prop="realName"></el-table-column>
            <el-table-column label="rtx工号" prop="workNo"></el-table-column>
            <el-table-column label="手机" prop="phone"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
        </el-table>
        <Row type="flex" justify="end" style="margin-top:10px">
            <Col>
                <Page
                    :current="page"
                    :page-size="pageSize"
                    :total="total"
                    show-sizer
                    show-elevator
                    show-total
                    @on-change="handlePageChange"
                    @on-page-size-change="handlePageSizeChange"
                    :page-size-opts="[10, 50, 100]"
                />
            </Col>
        </Row>
        <template slot="footer">
            <Button type="primary" @click="handleAdd">添加</Button>
            <Button @click="hide">取消</Button>
        </template>
    </Modal>
</template>
<script>
import { getUsersNotInRole, addRoleUsers } from '@/api/roles';
import store from '../store';
export default {
    data() {
        return {
            visible: false,
            selectedUserIds: [],
            data: [],
            page: 1,
            pageSize: 10,
            total: 0,
            loading: false,
            userId: '',
            storeState: store.state,
            keyword: ''
        };
    },
    methods: {
        async getData(query = {}) {
            const page = query.page || this.page;
            const pageSize = query.pageSize || this.pageSize;
            const keyword = query.keyword || this.keyword;
            this.page = page;
            this.pageSize = pageSize;
            try {
                this.loading = true;
                const { data } = await getUsersNotInRole({
                    roleId: this.storeState.selectRoleId,
                    currPage: page,
                    pageSize,
                    keyword: keyword
                });
                if (data.success && data.data) {
                    this.data = data.data.list;
                    this.total = data.data.totalCount;
                }
            } finally {
                this.loading = false;
            }
        },
        handleSearch() {
            this.getData({ page: 1, keyword: this.keyword });
        },
        show() {
            this.getData();
            this.visible = true;
        },
        hide() {
            Object.assign(this, {
                visible: false,
                selectedUserIds: [],
                data: [],
                page: 1,
                pageSize: 10,
                total: 0,
                loading: false,
                userId: '',
                keyword: ''
            });
        },
        async handleAdd() {
            if (this.selectedUserIds.length === 0) {
                this.$Message.error('请先选择用户');
                return;
            }
            // 缺少添加批量用户到角色的接口 TODO
            const { data } = await addRoleUsers(this.storeState.selectRoleId, this.selectedUserIds);
            if (data.success && data.data) {
                this.$Message.success('添加成功');
                store.getUsers();
                this.hide();
            }
        },
        handleSelectionChange(val) {
            this.selectedUserIds = val.map(item => item.userId);
        },
        handlePageChange(page) {
            if (this.page === page) return;
            this.getData({ page });
        },
        handlePageSizeChange(pageSize) {
            this.getData({ page: 1, pageSize });
        }
    }
};
</script>
