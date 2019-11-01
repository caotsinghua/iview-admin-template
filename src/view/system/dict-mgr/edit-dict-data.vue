<template>
    <Modal :title="`${this.dictId ? '编辑字典数据' : '新增字典数据'}`" width="500" v-model="visible" @on-cancel="hide">
        <Form ref="form" :model="form" :rules="ruleValidate" :label-width="85">
            <FormItem prop="dictLabel" label="字典标签：">
                <Input type="text" v-model.trim="form.dictLabel"></Input>
            </FormItem>
            <FormItem prop="dictValue" label="字典键值：">
                <Input type="text" v-model.trim="form.dictValue" :maxlength="50"></Input>
            </FormItem>
            <FormItem prop="dictOrder" label="排序号：">
                <InputNumber v-model="form.dictOrder" :min="0" :max="1000" style="width:160px"></InputNumber>
            </FormItem>
            <FormItem prop="remark" label="备注信息：">
                <Input type="textarea" v-model.trim="form.remark"></Input>
            </FormItem>
        </Form>
        <template slot="footer">
            <Button type="primary" @click="save">提交</Button>
            <Button @click="hide">取消</Button>
        </template>
    </Modal>
</template>
<script>
import { updateDict, addDict } from '@/api/dicts';
export default {
    name: 'edit-dict-data',
    components: {},
    data() {
        return {
            form: {
                dictLabel: this.dictLabel,
                dictValue: this.dictValue,
                dictOrder: this.dictOrder,
                remark: this.remark
            },
            ruleValidate: {
                dictLabel: [
                    {
                        required: true,
                        message: '必填字段',
                        trigger: 'blur'
                    }
                ],
                dictValue: [
                    {
                        required: true,
                        message: '必填字段',
                        trigger: 'blur'
                    }
                ],
                dictOrder: [
                    {
                        required: true,
                        type: 'number',
                        message: '必填字段',
                        trigger: 'blur'
                    }
                ]
            },
            visible: false,
            parentDictId: 0,
            dictType: '',
            dictId: 0,
            dictLabel: '',
            dictValue: '',
            dictOrder: 0,
            remark: ''
        };
    },
    // props: {
    //     parentDictId: Number,
    //     dictType: String,
    //     dictId: Number,
    //     dictLabel: String,
    //     dictValue: String,
    //     dictOrder: Number,
    //     remark: String
    // },
    methods: {
        show(row) {
            if (row) {
                this.parentDictId = row.parentDictId;
                this.dictType = row.dictType;
                this.dictId = row.dictId;
                this.dictLabel = row.dictLabel;
                this.dictValue = row.dictValue;
                this.dictOrder = row.dictOrder;
                this.remark = row.remark;
                Object.assign(this.form, {
                    dictLabel: this.dictLabel,
                    dictValue: this.dictValue,
                    dictOrder: this.dictOrder,
                    remark: this.remark
                });
            }
            this.visible = true;
        },
        hide() {
            this.$refs['form'].resetFields();
            Object.assign(this, {
                parentDictId: 0,
                dictType: '',
                dictId: 0,
                dictLabel: '',
                dictValue: '',
                dictOrder: 0,
                remark: ''
            });
            this.visible = false;
        },
        save() {
            let result = null;
            this.$refs['form'].validate(valid => {
                if (valid) {
                    let params = {
                        parentDictId: this.parentDictId,
                        dictId: this.dictId,
                        dictType: this.dictType,
                        dictLabel: this.form.dictLabel,
                        dictValue: this.form.dictValue,
                        dictOrder: this.form.dictOrder,
                        remark: this.form.remark
                    };
                    this.submit(params);
                } else {
                    result = false;
                }
            });
            return result;
        },
        submit(params) {
            if (this.dictId) {
                updateDict(params).then(
                    res => {
                        if (res.data.success) {
                            this.$Message.success('修改成功');
                            this.hide();
                            this.$emit('refresh-data');
                        }
                    },
                    err => {
                        console.log(err);
                    }
                );
            } else {
                addDict(params).then(
                    res => {
                        if (res.data.success) {
                            this.$Message.success('新增成功');
                            this.hide();
                            this.$emit('refresh-data');
                        }
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        }
    }
};
</script>
