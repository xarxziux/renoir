/* global require, __dirname, module */
const path = require ('path');

module.exports = {
    entry: path.resolve (__dirname, 'tmp', 'index.js'),
    output: {
        filename: 'index.js',
        path: path.resolve (__dirname, 'dist'),
        library: 'renoir',
        libraryTarget: 'umd'
    }
};
