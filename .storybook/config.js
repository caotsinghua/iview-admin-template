import { configure, addDecorator } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import Vue from 'vue';
import iView from 'iview';
import '../src/index.less';
import '../src/assets/icons/iconfont.css';
Vue.use(iView);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}
addDecorator(withInfo);
configure(loadStories, module);
