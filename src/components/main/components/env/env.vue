<template>
    <div class="env" v-if="sysEnv.activeIsolationSystem !== 'prod'">当前环境: {{ sysEnv }}</div>
</template>
<script>
export default {
    data() {
        return {};
    },
    computed: {
        sysEnv() {
            return this.$store.state.app.env;
        }
    },
    mounted() {}
};
</script>
<style lang="less" scoped>
.env {
    margin-right: 10px;
    color: #f77000;
    font-size: 16px;
}
</style>
