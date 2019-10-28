<template>
    <div class="container operate-container">
        <header class="search">
            <Form :label-width="100" label-position="left">
                <Row :gutter="15">
                    <Col :xl="7" :xxl="5"
                        ><FormItem label="操作描述"> <Input v-model.trim="operDesc"/></FormItem
                    ></Col>
                    <Col :xl="7" :xxl="5"
                        ><FormItem label="ip地址"> <Input v-model.trim="operIp"/></FormItem
                    ></Col>
                    <Col :xl="7" :xxl="5"
                        ><FormItem label="操作方法"> <Input v-model.trim="operMethod"/></FormItem
                    ></Col>
                    <Col :xl="2" :xxl="2"> <Button type="primary" @click="handleSearch">查询</Button></Col>
                </Row>
            </Form>
        </header>
        <main>
            <el-table :data="data" v-loading="loading" size="small">
                <el-table-column prop="index" label="序号"></el-table-column>
                <el-table-column prop="operMethod" label="操作方法" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="operIp" label="ip地址" width="130" show-overflow-tooltip></el-table-column>
                <el-table-column prop="operDesc" label="操作描述" width="130" show-overflow-tooltip></el-table-column>
                <el-table-column prop="requestMethod" label="请求类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="requestUri" label="请求路径" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="userAgent" label="用户标识" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createByUserName" label="操作用户" show-overflow-tooltip></el-table-column>
                <el-table-column prop="operSysName" label="设备名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="browserName" label="浏览器名称" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="spendTime" label="响应时间" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="createTime" label="操作时间" show-overflow-tooltip></el-table-column>
            </el-table>
            <Page
                :current="page"
                :page-size="pageSize"
                :total="total"
                @on-change="handlePageChange"
                @on-page-size-change="handlePageSizeChange"
                show-total
                show-elevator
                show-sizer
                style="text-align:right;margin-top:20px;"
                :page-size-opts="[20, 50, 100]"
            />
        </main>
    </div>
</template>
<script>
import { getOperateLogs } from '@/api/operate';
import { pushDataIndex } from '@/libs/util';
export default {
    data() {
        return {
            data: [],
            page: 1,
            pageSize: 20,
            total: 0,
            loading: false,
            operDesc: '',
            operIp: '',
            operMethod: ''
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData(query = {}) {
            const page = query.page || this.page;
            const pageSize = query.pageSize || this.pageSize;
            this.page = page;
            this.pageSize = pageSize;

            try {
                this.loading = true;
                const { data } = await getOperateLogs({
                    currPage: page,
                    pageSize,
                    operDesc: this.operDesc,
                    operIp: this.operIp,
                    operMethod: this.operMethod
                });
                if (data.success && data.data) {
                    const list = data.data.list;
                    this.data = pushDataIndex(list, page, pageSize);
                    this.total = data.data.totalCount;
                }
            } finally {
                this.loading = false;
            }
        },
        handlePageChange(page) {
            if (page === this.page) return;
            this.getData({ page });
        },
        handlePageSizeChange(pageSize) {
            this.getData({ pageSize, page: 1 });
        },
        handleSearch() {
            this.getData({ page: 1 });
        }
    }
};
</script>
