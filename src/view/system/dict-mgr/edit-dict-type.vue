<template>
    <Modal :title="`${this.dictId ? '编辑' : '新增'}字典类型`" v-model="visible" width="500" @on-cancel="hide">
        <Form ref="form" :model="form" :rules="ruleValidate" :label-width="85">
            <FormItem prop="dictLabel" label="字典名称：">
                <Input type="text" v-model.trim="form.dictLabel"></Input>
            </FormItem>
            <FormItem prop="dictType" label="字典类型：">
                <Input type="text" v-model.trim="form.dictType"></Input>
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
    name: 'edit-dict-type',
    components: {},
    data() {
        const validateSpace = (rule, value, callback) => {
            if (/\s/g.test(value)) {
                callback(new Error('不能包含空格'));
            } else {
                callback();
            }
        };
        return {
            form: {
                dictLabel: this.dictLabel,
                dictType: this.dictType,
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
                dictType: [
                    {
                        required: true,
                        message: '必填字段',
                        trigger: 'blur'
                    },
                    {
                        validator: validateSpace
                    }
                ]
            },
            visible: false,
            dictId: 0,
            dictLabel: '',
            dictType: '',
            remark: ''
        };
    },
    // props: {
    //     dictId: Number,
    //     dictLabel: String,
    //     dictType: String,
    //     remark: String
    // },
    methods: {
        show(row) {
            if (row) {
                this.dictId = row.dictId;
                this.dictLabel = row.dictLabel;
                this.dictType = row.dictType;
                this.remark = row.remark;
                Object.assign(this.form, {
                    dictLabel: this.dictLabel,
                    dictType: this.dictType,
                    remark: this.remark
                });
            }
            this.visible = true;
        },
        hide() {
            this.$refs['form'].resetFields();
            Object.assign(this, {
                dictId: 0,
                dictLabel: '',
                dictType: '',
                remark: ''
            });
            this.visible = false;
        },
        save() {
            let result = null;
            this.$refs['form'].validate(valid => {
                if (valid) {
                    let params = {
                        dictId: this.dictId,
                        dictLabel: this.form.dictLabel,
                        dictType: this.form.dictType,
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
