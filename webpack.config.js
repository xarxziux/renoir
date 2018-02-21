/* global require, __dirname, module */
const path = require ('path');
// const eslintConfig = require ('./.eslintrc.js');
// const babelConfig = require ('./.babelrc.js');

module.exports = {
    entry: path.resolve (__dirname, 'tmp', 'index.js'),
    output: {
        filename: 'index.js',
        path: path.resolve (__dirname, 'dist'),
        library: 'renoir',
        libraryTarget: 'umd'
    }
    /*
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                include: path.resolve (__dirname, 'src'),
                use: {
                    loader: 'eslint-loader',
                    options: eslintConfig
                }
            },
            {
                test: /\.js$/,
                include: path.resolve (__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: babelConfig
                }
            }
        ]
    }
    */
};
