module.exports = {
    printWidth: 100,
    tabWidth: 2,
    singleQuote: true,
    semi: true,
    trailingComma: 'all',
    arrowParens: 'always',
    overrides: [
        {
            files: '*.{js,jsx,tsx,ts,css,scss,json,html}',
            options: {
                tabWidth: 4,
            },
        },
    ],
};
