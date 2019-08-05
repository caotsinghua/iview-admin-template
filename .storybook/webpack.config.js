module.exports = function({ config }) {
    config.module.rules.push({
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre'
    });
    config.module.rules.push({
        test: /\.vue$/,
        loader: 'storybook-addon-vue-info/loader',
        enforce: 'post'
    });
    config.module.rules.push({
      resourceQuery: /blockType=docs/,
      use: ['storybook-readme/vue/docs-loader', 'html-loader', 'markdown-loader'],
    });
    config.module.rules.push({
        test: /\.less$/,
        oneOf: [
            /* config.module.rule('less').oneOf('vue-modules') */
            {
                resourceQuery: /module/,
                use: [
                    /* config.module.rule('less').oneOf('vue-modules').use('vue-style-loader') */
                    {
                        loader: 'vue-style-loader',
                        options: {
                            sourceMap: false,
                            shadowMode: false
                        }
                    },
                    /* config.module.rule('less').oneOf('vue-modules').use('css-loader') */
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            importLoaders: 2,
                            modules: true,
                            localIdentName: '[name]_[local]_[hash:base64:5]'
                        }
                    },
                    /* config.module.rule('less').oneOf('vue-modules').use('postcss-loader') */
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false
                        }
                    },
                    /* config.module.rule('less').oneOf('vue-modules').use('less-loader') */
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            },
            /* config.module.rule('less').oneOf('vue') */
            {
                resourceQuery: /\?vue/,
                use: [
                    /* config.module.rule('less').oneOf('vue').use('vue-style-loader') */
                    {
                        loader: 'vue-style-loader',
                        options: {
                            sourceMap: false,
                            shadowMode: false
                        }
                    },
                    /* config.module.rule('less').oneOf('vue').use('css-loader') */
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            importLoaders: 2
                        }
                    },
                    /* config.module.rule('less').oneOf('vue').use('postcss-loader') */
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false
                        }
                    },
                    /* config.module.rule('less').oneOf('vue').use('less-loader') */
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            },
            /* config.module.rule('less').oneOf('normal-modules') */
            {
                test: /\.module\.\w+$/,
                use: [
                    /* config.module.rule('less').oneOf('normal-modules').use('vue-style-loader') */
                    {
                        loader: 'vue-style-loader',
                        options: {
                            sourceMap: false,
                            shadowMode: false
                        }
                    },
                    /* config.module.rule('less').oneOf('normal-modules').use('css-loader') */
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            importLoaders: 2,
                            modules: true,
                            localIdentName: '[name]_[local]_[hash:base64:5]'
                        }
                    },
                    /* config.module.rule('less').oneOf('normal-modules').use('postcss-loader') */
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false
                        }
                    },
                    /* config.module.rule('less').oneOf('normal-modules').use('less-loader') */
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            },
            /* config.module.rule('less').oneOf('normal') */
            {
                use: [
                    /* config.module.rule('less').oneOf('normal').use('vue-style-loader') */
                    {
                        loader: 'vue-style-loader',
                        options: {
                            sourceMap: false,
                            shadowMode: false
                        }
                    },
                    /* config.module.rule('less').oneOf('normal').use('css-loader') */
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            importLoaders: 2
                        }
                    },
                    /* config.module.rule('less').oneOf('normal').use('postcss-loader') */
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false
                        }
                    },
                    /* config.module.rule('less').oneOf('normal').use('less-loader') */
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            }
        ]
    });
    return config;
};
