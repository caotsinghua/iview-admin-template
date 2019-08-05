module.exports = api => {
    console.log(api.env('test'));
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
