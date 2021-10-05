module.exports = function (api) {
    let validEnv = ['development', 'test', 'production'];
    let currentEnv = api.env();
    let isDevelopmentEnv = api.env('development');
    let isProductionEnv = api.env('production');
    let isTestEnv = api.env('test');

    if (!validEnv.includes(currentEnv)) {
        throw new Error(
            `${
                'Please specify a valid `NODE_ENV` or ' +
                '`BABEL_ENV` environment variables. Valid values are "development", ' +
                '"test", and "production". Instead, received: '
            }${JSON.stringify(currentEnv)}.`,
        );
    }

    return {
        presets: [
            isTestEnv && [
                '@babel/preset-env',
                {
                    targets: {
                        node: 'current',
                    },
                    modules: 'commonjs',
                },
                '@babel/preset-react',
            ],
            (isProductionEnv || isDevelopmentEnv) && [
                '@babel/preset-env',
                {
                    forceAllTransforms: true,
                    useBuiltIns: 'entry',
                    corejs: 3,
                    modules: false,
                    exclude: ['transform-typeof-symbol'],
                },
            ],
            [
                '@babel/preset-react',
                {
                    development: isDevelopmentEnv || isTestEnv,
                    useBuiltIns: true,
                },
            ],
        ].filter(Boolean),
        plugins: [
            'babel-plugin-macros',
            '@babel/plugin-syntax-dynamic-import',
            isTestEnv && 'babel-plugin-dynamic-import-node',
            '@babel/plugin-transform-destructuring',
            [
                '@babel/plugin-proposal-class-properties',
                {
                    loose: true,
                },
            ],
            [
                '@babel/plugin-proposal-object-rest-spread',
                {
                    useBuiltIns: true,
                },
            ],
            [
                '@babel/plugin-proposal-private-methods',
                {
                    loose: true,
                },
            ],
            [
                '@babel/plugin-proposal-private-property-in-object',
                {
                    loose: true,
                },
            ],
            [
                '@babel/plugin-transform-runtime',
                {
                    helpers: false,
                    regenerator: true,
                    corejs: false,
                },
            ],
            [
                '@babel/plugin-transform-regenerator',
                {
                    async: false,
                },
            ],
            isProductionEnv && [
                'babel-plugin-transform-react-remove-prop-types',
                {
                    removeImport: true,
                },
            ],
        ].filter(Boolean),
    };
};
