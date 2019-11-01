<template>
    <div class="organization-tree">
        <div class="search-bar">
            <Select
                v-model="organizationText"
                filterable
                clearable
                placeholder="搜索组织架构"
                remote
                :remote-method="filterOrganization"
                transfer
                @on-change="handleSelectOrg"
            >
                <Option v-for="node in autoCompleteData" :key="node.id" :value="node.id">{{ node.label }}</Option>
            </Select>
        </div>
        <div class="actions">
            <ButtonGroup shape="circle" size="small">
                <Button ghost type="primary" @click="expandAll">展开全部</Button>
                <Button ghost type="primary" @click="retractAll">收起全部</Button>
                <Button ghost type="primary" @click="showTreeModal">编辑</Button>
            </ButtonGroup>
        </div>
        <div class="tree">
            <Tree :data="storeState.treeData" @on-select-change="handleSelectChange" />
        </div>
        <TreeModal ref="tree-modal" />
    </div>
</template>
<script>
import TreeModal from './tree-modal';
import { expandOrRetract } from '@/libs/util';
import store from '../store';
export default {
    components: {
        TreeModal
    },
    data() {
        return {
            organizationText: '',
            storeState: store.state,
            autoCompleteData: []
        };
    },
    async mounted() {
        await store.getTreeData();
        store.setCurSelect(this.storeState.treeData && this.storeState.treeData[0]);
    },
    methods: {
        handleSelectChange(value) {
            const node = value[0];
            store.setCurSelect(node);
            store.clearData();
            store.getData();
            store.getDeptFlowUsers();
        },
        expandAll() {
            expandOrRetract(this.storeState.treeData, this, true);
        },
        retractAll() {
            expandOrRetract(this.storeState.treeData, this, false);
        },
        showTreeModal() {
            this.$refs['tree-modal'].show();
        },
        filterOrganization(value) {
            // 过滤树查找
            this.autoCompleteData = store.state.searchData.filter(node => node.label.indexOf(value) > -1);
        },
        handleSelectOrg(value) {
            // eslint-disable-next-line
            if (value == undefined) {
                return;
            }
            function findFromTree(value, tree) {
                for (let i = 0; i < tree.length; i++) {
                    if (tree[i].id === value) {
                        return tree[i];
                    } else {
                        if (tree[i].children) {
                            let res = findFromTree(value, tree[i].children);
                            if (res) return res;
                        }
                    }
                }
            }
            const treeNode = findFromTree(value, this.storeState.treeData);
            if (this.storeState.curSelect) {
                this.storeState.curSelect.selected = false;
            }
            store.setCurSelect(treeNode);
            store.getData();
            store.getDeptFlowUsers();
        }
    }
};
</script>
<style lang="less" scoped>
.search-bar {
    margin-bottom: 10px;
}
.actions {
    text-align: center;
    margin-bottom: 10px;
}
</style>
