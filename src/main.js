// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import iView from 'iview';
import i18n from '@/locale';
import config from '@/config';
import importDirective from '@/directive';
import { directive as clickOutside } from 'v-click-outside-x';
import installPlugin from '@/plugin';
import './index.less';
import '@/assets/icons/iconfont.css';
import VOrgTree from 'v-org-tree';
import 'v-org-tree/dist/v-org-tree.css';
// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock');
console.log({
    env: process.env
});

Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
});
Vue.use(VOrgTree);
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue);
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false;
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;
/**
 * 注册指令
 */
importDirective(Vue);
Vue.directive('clickOutside', clickOutside);

const main = async () => {
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
    } catch (e) {
        iView.Message.error(e.message || '获取登录态错误');
    } finally {
        /* eslint-disable no-new */
        new Vue({
            el: '#app',
            router,
            i18n,
            store,
            render: h => h(App)
        });
        iView.Spin.hide();
    }
};
main();
