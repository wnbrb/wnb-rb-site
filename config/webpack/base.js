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
};

module.exports = merge(webpackConfig, customConfig);
