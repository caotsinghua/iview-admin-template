<template>
    <div class="container privs-container">
        <div class="header" style="margin-bottom:10px">
            <Button type="primary" @click="openAddModal">添加权限</Button>
        </div>
        <main>
            <el-table
                :data="storeState.privsTreeData"
                v-loading="storeState.privsLoading"
                row-key="id"
                :indent="20"
                :row-style="getRowStyle"
            >
                <el-table-column prop="privName" label="权限名称" min-width="260px">
                    <template slot-scope="{ row }">
                        <Icon v-if="row.privType === 'C'" type="ios-folder" />
                        <Icon v-if="row.privType === 'M'" type="ios-document" />
                        <Icon v-if="row.privType === 'A'" type="md-radio-button-on" />
                        <span style="display:inline-block;margin-left:5px;">{{ row.privName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="privUri" label="路由名称" min-width="200"></el-table-column>
                <el-table-column prop="privIcon" label="图标" min-width="70">
                    <template slot-scope="{ row }">
                        <Icon :type="row.privIcon" v-if="row.privIcon" />
                    </template>
                </el-table-column>
                <el-table-column prop="privType" label="类型" min-width="70">
                    <template slot-scope="{ row }">
                        <Tag type="border" :color="filterPrivType(row.privType).color">{{
                            filterPrivType(row.privType).text
                        }}</Tag>
                    </template>
                </el-table-column>
                <el-table-column prop="remarks" label="备注" min-width="200px;"></el-table-column>
                <el-table-column prop="privCode" label="权限编码" min-width="200px;"></el-table-column>
                <el-table-column prop="privOrder" label="排序" min-width="60px;"></el-table-column>
                <el-table-column prop="isShow" label="是否显示" min-width="80" align="center">
                    <template slot-scope="{ row }">
                        <span>{{ row.isShow === 'N' ? '否' : '是' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="180px;">
                    <template slot-scope="{ row }">
                        <Button @click="handleAddSub(row)" type="primary" size="small" style="margin-right:5px;"
                            >添加下级</Button
                        >
                        <Button @click="handleUpdate(row)" type="primary" size="small" style="margin-right:5px;"
                            >编辑</Button
                        >
                        <Button @click="handleDelete(row)" type="error" size="small">删除</Button>
                    </template>
                </el-table-column>
            </el-table>
        </main>
        <PrivFormModal ref="priv-form-modal" />
    </div>
</template>
<script>
import store from './store';
import { deletePriv } from '@/api/privs';
import PrivFormModal from './components/priv-form-modal';

export default {
    components: {
        PrivFormModal
    },
    data() {
        return {
            storeState: store.state
        };
    },
    mounted() {
        store.getPrivsData();
    },
    methods: {
        handleAddSub(row) {
            this.$refs['priv-form-modal'].show(row);
        },
        handleUpdate(row) {
            this.$refs['priv-form-modal'].show(row, true);
        },
        handleDelete(row) {
            this.$Modal.confirm({
                title: '警告',
                content: '确认删除该权限？',
                onOk: async () => {
                    try {
                        const { data } = await deletePriv(row.privId);
                        if (data.data) {
                            this.$Message.success('删除成功');
                            store.getPrivsData();
                        }
                    } catch (e) {
                        throw e;
                    }
                }
            });
        },
        openAddModal() {
            this.$refs['priv-form-modal'].show();
        },
        getRowStyle({ row }) {
            switch (row.privType) {
                case 'C':
                    return {
                        color: '#000'
                    };
                case 'M':
                    return {
                        color: '#2D8cF0'
                    };
                case 'A':
                    return {
                        color: '#19be6b'
                    };
            }
        }
    }
};
</script>
<style lang="less" scoped>
.priv-name {
    display: inline-block;
    &.C {
        color: #ff7000;
    }
    &.M {
    }
    &.A {
    }
}
</style>
