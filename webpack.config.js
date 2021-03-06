const path = require('path')
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const rootDir = __dirname
const srcDir = path.resolve(rootDir, 'src')
const distDir = path.resolve(rootDir, 'dist')

module.exports = {
    entry: path.resolve(srcDir, 'index.js'),
    output: {
        path: distDir,
        filename: 'jquery-extends.js',
        libraryTarget: 'umd',
        library: 'jQuery'
        //umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                } 
            }
        ]
    },
    externals: {
        jquery: {
            root: 'jQuery',
            commonjs: 'jquery',
            commonjs2: 'jquery',
            amd: 'jquery',
        }
    },
    devtool: '#inline-source-map',
    plugins: [
        new webpack.ProvidePlugin({
            window: [path.resolve(srcDir, 'vars/window'), 'default'],
            document: [path.resolve(srcDir, 'vars/document'), 'default'],
            $: [path.resolve(srcDir, 'vars/jquery'), 'default'],
            jQuery: [path.resolve(srcDir, 'vars/jquery'), 'default']
        }),
        new UglifyJsPlugin({
            sourceMap: true,
        }),
    ],
};
