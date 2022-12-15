const { webpackConfig, merge } = require('@rails/webpacker');
const customConfig = {
    resolve: {
        extensions: [
            '.jsx',
            '.mjs',
            '.js',
            '.sass',
            '.scss',
            '.css',
            '.module.sass',
            '.module.scss',
            '.module.css',
            '.png',
            '.svg',
            '.gif',
            '.jpeg',
            '.jpg',
        ],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = merge(webpackConfig, customConfig);
