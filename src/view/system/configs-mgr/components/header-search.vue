<template>
    <div class="options-mgr-header-search">
        <Form :label-width="100" label-position="left">
            <Row :gutter="15">
                <Col :span="7">
                    <FormItem label="配置编码" style="margin-bottom:0">
                        <Input v-model.trim="storeState.queryInfo.configCode" />
                    </FormItem>
                </Col>
                <Col :span="7">
                    <Button type="primary" @click="handleSearch" style="margin-right:10px">查询</Button>
                    <Button @click="handleReset">清空</Button>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
import store from '../store';
export default {
    data() {
        return {
            storeState: store.state
        };
    },
    methods: {
        handleSearch() {
            store.getData({ page: 1 });
        },
        handleReset() {
            store.setQueryInfo({ configCode: '' });
            this.handleSearch();
        }
    }
};
</script>
