import iView from 'iview';
import Vue from 'vue';
import App from '@/App';
import createRouter from '@/router';
import store from '@/store';
import { getToken } from './util';

export const appContainer = {
    router: null,
    vm: null
};
function initApp() {
    const router = createRouter();
    appContainer.router = router;
    appContainer.vm = new Vue({
        el: '#app',
        router,
        store,
        render: h => h(App)
    });
}
// ============\使用getStatus判断登陆态时使用
export const initAppByStatus = async () => {
    iView.Spin.show({
        render: h => {
            return h('div', [
                h('Icon', {
                    class: 'index-spin-load',
                    props: {
                        type: 'ios-loading',
                        size: 18
                    }
                }),
                h('div', '正在加载，请稍后...')
            ]);
        }
    });
    try {
        await store.dispatch('getUserStatus');
    } finally {
        iView.Spin.hide();
        initApp();
    }
};

// 通过token判断登陆态
export const initAppByToken = async () => {
    const hasLogged = !!getToken();
    await store.dispatch('getUserStatus', hasLogged); // 传入第二个登陆态参数则不会调用接口
    initApp();
};

/**
 * @description 输出编译信息，需要在禁用console.log之前调用
 */
export const logBuildInfo = () => {
    // ========version info=============
    Object.keys(process.env.BUILD_INFO).forEach(key => {
        console.log(
            `%c ${key} %c ${process.env.BUILD_INFO[key]} %c `,
            'color:#409eff;border:1px solid #409eff;border-radius:3px',
            '',
            'color:orange;font-weight:bold'
        );
    });
};

/**
 * @description production环境禁用console.log
 */
export const disableLog = () => {
    if (process.env.NODE_ENV === 'production') {
        console.log = () => {}; // 取消console
    }
};
