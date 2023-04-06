const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './app/helpers/**/*.rb',
        './app/views/**/*.{erb,html}',
        './public/*.html',
        './app/javascript/**/*.{css,scss,js,jsx}',
        './app/javascript/**/**/*.{css,scss,js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                wnbrb: {
                    pink: {
                        default: '#DF7270',
                        light: '#FFF3F3',
                    },
                    orange: {
                        default: '#F37D7B',
                        medium: '#FBBFBE',
                        light: '#FEF3F3',
                    },
                    gray: {
                        default: '#4A4A4A',
                        medium: '#757575',
                        light: '#EFEFEF',
                    },
                    ruby: {
                        default: '#993232',
                        medium: '#EF8987',
                        light: '#FAE6E6',
                    },
                    emerald: {
                        default: '#45823F',
                        medium: '#98DA80',
                        light: '#DCEDD6',
                    },
                    sapphire: {
                        default: '#485496',
                        medium: '#9FD1FF',
                        light: '#DAE9F6',
                    },
                    opal: {
                        default: '#909090',
                        medium: '#F4F4F4',
                        light: '#EFEFEF',
                    },
                },
            },
            fontFamily: {
                sans: ['Rubik', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
    ],
};
