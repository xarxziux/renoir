/**
 * @format
 * Adapted from https://github.com/krasimir/webpack-library-starter/
    blob/master/webpack.config.js
 */

/* global require: false */
/* global __dirname: false */
/* global module: false */

const path = require('path');

const libraryName = 'renoir';
const outputFile = libraryName + '.min.js';
const srcDir = path.resolve(__dirname, 'src');

module.exports = {
    entry: './src/renoir.mjs',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                loader: 'babel-loader',
                include: srcDir
            },
            {
                test: /\.mjs$/,
                loader: 'eslint-loader',
                include: srcDir
            }
        ]
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.json', '.js', '.mjs']
    },
    externals: 'number-detect'
};
