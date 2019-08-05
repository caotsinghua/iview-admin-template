import { configure, addDecorator, addParameters } from '@storybook/vue';
import { addReadme, configureReadme } from 'storybook-readme/vue';
import { themes, create } from '@storybook/theming';
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

const basicTheme = create({
    base: 'light',
    brandTitle: 'custom-admin-docs',
    brandUrl: 'https://github.com/tuchk4/storybook-readme',
    brandImage: null,

});

addParameters({
    options: {
        showPanel: true,
        panelPosition: 'right',
        theme: basicTheme
        // theme: themes.dark,
    },
    readme: {
        // You can set the global code theme here.
        // codeTheme: 'xonokai'
        codeTheme:'github'
    }
});
addDecorator(addReadme);
configureReadme({
    StoryPreview: {
        data() {
            return {
                styles: {
                    // display: 'flex',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    // margin: '16px 0',
                    border: '2px dashed #eee',
                    padding: '32px'
                }
            };
        },
        template: `<div v-bind:style="styles"><slot></slot></div>`
    },
    DocPreview: {
        data() {
            return {
                styles: {
                    padding: '8px 32px',
                    margin: '0 0 0 32px',
                    // borderLeft: '4px dashed #eee'
                }
            };
        },
        template: `<div v-bind:style="styles"><slot></slot></div>`
    },
    HeaderPreview: {
        data() {
            return {
                styles: {
                    margin: '0 0 32px 0',
                    background: '#ffffab'
                }
            };
        },
        template: `<div v-bind:style="styles"><slot></slot></div>`
    },
    FooterPreview: {
        data() {
            return {
                styles: {
                    margin: '32px 0 0 0',
                    background: 'rgba(171, 255, 176, 1)'
                }
            };
        },
        template: `<div v-bind:style="styles"><slot></slot></div>`
    }
});
configure(loadStories, module);
