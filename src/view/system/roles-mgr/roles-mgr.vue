<template>
    <div class="container role-container">
        <Row :gutter="20">
            <Col :xl="9" :xxl="9">
                <Roles />
            </Col>
            <Col :xl="15" :xxl="15" style="border-left:2px solid #f0f2f5;padding-left:20px">
                <Tabs :animated="false">
                    <TabPane name="users" label="角色用户">
                        <Users />
                    </TabPane>
                    <TabPane name="privs" label="角色权限" v-loading="storeState.privLoading">
                        <Privs v-if="storeState.allPrivsTreeData.length > 0" />
                        <div v-else style="text-align:center;margin-top:50px;font-size:20px;">请先选择角色</div>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    </div>
</template>
<script>
import Roles from './components/roles';
import Users from './components/users';
import Privs from './components/privs';
import store from './store';
export default {
    name: 'roles-management',
    components: {
        Roles,
        Users,
        Privs
    },
    data() {
        return {
            storeState: store.state
        };
    }
};
</script>
