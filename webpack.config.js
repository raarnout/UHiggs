const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    devServer: {
        watchFiles: [
            'src/**/*',
            'public/**/*'
        ]
    },
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(ts|tsx?)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }, 
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js'
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js'
    },
    plugins: [
        // Extract css files to seperate bundle
        new MiniCssExtractPlugin(),
        // Copy fonts and images to dist
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/fonts', to: 'fonts' },
                { from: 'src/img', to: 'img' }
            ]
        }),
        // Use index.html as the
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
