<style lang="less">
@import './login.less';
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="handleSubmit"></login-form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import LoginForm from '_c/login-form';
import { mapActions } from 'vuex';
export default {
    components: {
        LoginForm
    },
    methods: {
        ...mapActions(['handleLogin', 'getUserInfo']),
        async handleSubmit({ userName, password }) {
            try {
                const logged = await this.handleLogin({ userName, password });
                if (logged) {
                    this.$router.push({
                        name: this.$config.homeName
                    });
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
};
</script>

<style></style>
