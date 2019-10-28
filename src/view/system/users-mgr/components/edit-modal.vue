<template>
    <Modal title="用户基本信息" v-model="visible" width="60%" @on-cancel="hide">
        <UserForm ref="user-form" />
        <template slot="footer">
            <Button type="primary" @click="handleSubmit" :loading="loading">提交</Button>
            <Button @click="hide">取消</Button>
        </template>
    </Modal>
</template>
<script>
import UserForm from './user-form';
export default {
    components: {
        UserForm
    },
    data() {
        return {
            visible: false,
            userId: null,
            loading: false
        };
    },
    methods: {
        show(row) {
            if (row && row.userId) {
                this.userId = row.userId;
                this.$refs['user-form'].init(row);
            }
            this.visible = true;
        },
        hide() {
            this.$refs['user-form'].reset();
            this.visible = false;
            this.userId = null;
        },
        async handleSubmit() {
            this.loading = true;
            try {
                const success = await this.$refs['user-form'].submit();
                if (success) {
                    this.hide();
                }
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>
