<template>
    <Modal v-model="visible" :title="`${this.readOnly ? '详情' : this.editRow ? '更新' : '创建'}表单`" width="50%">
        <EditForm ref="edit-form" :loading="submiting" :readOnly="readOnly" @close-modal="closeModal">
            <slot></slot>
        </EditForm>
        <template slot="footer">
            <Button type="primary" :loading="submiting" @click="handleSubmit" v-if="!readOnly">{{
                this.editRow ? '更新' : '提交'
            }}</Button>
            <Button @click="closeModal">取消</Button>
        </template>
    </Modal>
</template>

<script>
import EditForm from './form';
export default {
    name: 'crud-form-modal',
    components: {
        EditForm
    },
    data() {
        return {
            visible: false,
            submiting: false,
            editRow: null,
            readOnly: false
        };
    },
    methods: {
        openModal(row, readOnly = false) {
            this.editRow = row;
            this.readOnly = readOnly;
            this.$refs['edit-form'].initForm(row);
            this.visible = true;
        },
        closeModal() {
            this.$refs['edit-form'].clearForm();
            this.visible = false;
        },
        async handleSubmit() {
            if (this.readOnly) return;
            try {
                this.submiting = true;
                // 调用表单更新
                await this.$refs['edit-form'].submit();
            } catch (e) {
                throw e;
            } finally {
                this.submiting = false;
            }
        }
    }
};
</script>
