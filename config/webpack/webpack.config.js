// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const { generateWebpackConfig, merge } = require('shakapacker');

const webpackConfig = generateWebpackConfig();

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

module.exports = merge(customConfig, webpackConfig);
