<style lang="less">
@import './login.less';
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="handleSubmit" :logging="logging"></login-form>
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
    data() {
        return {
            logging: false
        };
    },
    methods: {
        ...mapActions(['handleLogin']),
        async handleSubmit({ userName, password }) {
            try {
                this.logging = true;
                const logged = await this.handleLogin({ userName, password });
                if (logged) {
                    this.$router.push({
                        name: this.$config.homeName
                    });
                }
            } catch (e) {
                console.error(e);
            }
            this.logging = false;
        }
    }
};
</script>

<style></style>
