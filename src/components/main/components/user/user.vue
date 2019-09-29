<template>
    <div class="user-avatar-dropdown">
        <Dropdown @on-click="handleClick">
            <Badge :dot="!!messageUnreadCount">
                <Avatar style="background-color: #87d068" :title="userInfo.userName">
                    {{ userInfo.userName && userInfo.userName[0] }}</Avatar
                >
            </Badge>
            <Icon :size="18" type="md-arrow-dropdown"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem name="change-log">更新日志</DropdownItem>
                <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
import './user.less';
import { mapActions } from 'vuex';
export default {
    name: 'User',
    props: {
        userAvatar: {
            type: String,
            default: ''
        },
        messageUnreadCount: {
            type: Number,
            default: 0
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.user.userInfo;
        }
    },
    methods: {
        ...mapActions(['handleLogOut']),
        logout() {
            this.handleLogOut().then(() => {
                this.$router.push({
                    name: 'login'
                });
            });
        },
        handleClick(name) {
            switch (name) {
                case 'logout':
                    this.logout();
                    break;
                case 'change-log':
                    this.$router.push({ name: 'change-log' });
                    break;
            }
        }
    }
};
</script>
