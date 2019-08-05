module.exports = api => {
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: 'commonjs',
                    targets: {
                        node: 'current'
                    }
                }
            ],
            '@vue/app'
        ],
        plugins: [...((api.env('test') && 'require-context-hook') || []), '@babel/plugin-syntax-dynamic-import']
    };
};
